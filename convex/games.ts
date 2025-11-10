import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    difficulty: v.number(),
    playerToPlay: v.string(),
    roomCode: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.insert("games", {
      status: "lobby",
      category: args.category,
      difficulty: args.difficulty,
      playerToPlay: args.playerToPlay,
      roomCode: args.roomCode,
      players: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return game;
  },
});

export const joinGame = mutation({
  args: {
    gameId: v.id("games"),
    playerId: v.string(),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    if (game.status !== "lobby") {
      throw new Error("Game is not in lobby");
    }

    if (game.players.some((player) => player.id === args.playerId)) {
      throw new Error("Player already in game");
    }

    await ctx.db.patch(args.gameId, {
      players: [
        ...game.players,
        { id: args.playerId, username: args.username, score: 0 },
      ],
    });

    return game;
  },
});
