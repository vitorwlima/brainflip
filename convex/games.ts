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
    difficulty: v.string(),
    roomCode: v.string(),
    username: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.insert("games", {
      status: "lobby",
      category: args.category,
      difficulty: args.difficulty,
      roomCode: args.roomCode,
      playerToPlay: args.userId,
      players: [
        { id: args.userId, username: args.username, isHost: true, score: 0 },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return game;
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
    });

    return game;
  },
});
