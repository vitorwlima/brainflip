import { shuffle } from "../src/lib/utils/shuffle";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const getGame = query({
  args: {
    gameId: v.id("games"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.gameId);
  },
});

export const createGame = mutation({
  args: {
    category: v.string(),
    difficulty: v.string(),
    roomCode: v.string(),
    username: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const numberOfPairs =
      args.difficulty === "easy"
        ? 32
        : args.difficulty === "medium"
        ? 48
        : args.difficulty === "hard"
        ? 64
        : 80;

    const pairs = Array.from({ length: numberOfPairs / 2 }, (_, index) => ({
      value: (index + 1).toString(),
      status: "hidden" as const,
    }));

    const cards = shuffle([...pairs, ...pairs]).map((card) => ({
      ...card,
      id: crypto.randomUUID(),
    }));

    const game = await ctx.db.insert("games", {
      status: "lobby",
      category: args.category,
      difficulty: args.difficulty,
      roomCode: args.roomCode,
      playerToPlay: args.userId,
      players: [
        { id: args.userId, username: args.username, isHost: true, score: 0 },
      ],
      cards,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return game;
  },
});

export const startGame = mutation({
  args: {
    gameId: v.id("games"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.gameId, {
      status: "in_game",
      updatedAt: Date.now(),
    });
  },
});

export const getGameByRoomCode = query({
  args: {
    roomCode: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("games")
      .withIndex("by_roomCode", (q) => q.eq("roomCode", args.roomCode))
      .unique();
  },
});

export const updateGameSettings = mutation({
  args: {
    gameId: v.id("games"),
    category: v.optional(v.string()),
    difficulty: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    const patch: {
      category?: string;
      difficulty?: string;
      updatedAt?: number;
    } = {};

    if (args.category !== undefined) {
      patch.category = args.category;
    }

    if (args.difficulty !== undefined) {
      patch.difficulty = args.difficulty;
    }

    if (Object.keys(patch).length === 0) {
      return game;
    }

    patch.updatedAt = Date.now();

    await ctx.db.patch(args.gameId, patch);

    return {
      ...game,
      ...patch,
    };
  },
});

export const joinGame = mutation({
  args: {
    roomCode: v.string(),
    playerId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .withIndex("by_roomCode", (q) => q.eq("roomCode", args.roomCode))
      .unique();

    if (!game) {
      throw new Error("Game not found");
    }

    if (game.status !== "lobby") {
      throw new Error("Game is not in lobby");
    }

    if (game.players.some((player) => player.id === args.playerId)) {
      throw new Error("Player already in game");
    }

    await ctx.db.patch(game._id, {
      players: [
        ...game.players,
        { id: args.playerId, username: args.username, score: 0, isHost: false },
      ],
      updatedAt: Date.now(),
    });

    return game;
  },
});

export const flipCard = mutation({
  args: {
    gameId: v.id("games"),
    cardId: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    const flippedCard = game.cards.find((card) => card.id === args.cardId);

    if (!flippedCard) {
      throw new Error("Card not found");
    }

    if (flippedCard.status !== "hidden") {
      throw new Error("Card already flipped");
    }

    const alreadyFlippedCards = game.cards.filter(
      (card) => card.status === "flipped"
    );

    if (alreadyFlippedCards.length >= 2) {
      throw new Error("Please wait for the current flip to resolve");
    }

    const updatedCards = game.cards.map((card) => {
      if (card.id === args.cardId) {
        return { ...card, status: "flipped" as const };
      }

      return card;
    });

    await ctx.db.patch(args.gameId, {
      cards: updatedCards,
      updatedAt: Date.now(),
    });

    if (alreadyFlippedCards.length === 1) {
      const firstCard = alreadyFlippedCards[0];
      const secondCard = updatedCards.find((card) => card.id === args.cardId)!;

      await ctx.scheduler.runAfter(3000, api.games.resolveFlip, {
        gameId: args.gameId,
        firstCardId: firstCard.id,
        secondCardId: secondCard.id,
        currentPlayerId: game.playerToPlay,
      });
    }
  },
});

export const resolveFlip = mutation({
  args: {
    gameId: v.id("games"),
    firstCardId: v.string(),
    secondCardId: v.string(),
    currentPlayerId: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);

    if (!game) {
      return;
    }

    const flippedCards = game.cards.filter(
      (card) => card.id === args.firstCardId || card.id === args.secondCardId
    );
    const isMatch = flippedCards[0].value === flippedCards[1].value;

    const updatedCards = game.cards.map((card) => {
      if (card.id !== args.firstCardId && card.id !== args.secondCardId) {
        return card;
      }

      return {
        ...card,
        status: isMatch ? ("matched" as const) : ("hidden" as const),
      };
    });

    const gameStatus = updatedCards.every((card) => card.status === "matched")
      ? "finished"
      : "in_game";

    const patch: Partial<typeof game> = {
      cards: updatedCards,
      status: gameStatus,
      updatedAt: Date.now(),
    };

    const getPlayersPatch = () => {
      const playersPatch: Partial<typeof game> = {};
      if (isMatch) {
        playersPatch.players = game.players.map((player) => {
          if (player.id === args.currentPlayerId) {
            return { ...player, score: player.score + 1 };
          }

          return player;
        });

        playersPatch.playerToPlay = args.currentPlayerId;
        return playersPatch;
      }

      const currentPlayerIndex = game.players.findIndex(
        (player) => player.id === args.currentPlayerId
      );

      if (currentPlayerIndex >= 0) {
        const nextPlayer =
          game.players[(currentPlayerIndex + 1) % game.players.length];
        playersPatch.playerToPlay = nextPlayer.id;
      }

      return playersPatch;
    };

    const { players, playerToPlay } = getPlayersPatch();
    if (players) {
      patch.players = players;
    }
    if (playerToPlay) {
      patch.playerToPlay = playerToPlay;
    }

    await ctx.db.patch(args.gameId, patch);
  },
});
