import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  games: defineTable({
    status: v.union(
      v.literal("lobby"),
      v.literal("in_game"),
      v.literal("finished")
    ),
    category: v.string(),
    difficulty: v.string(),
    playerToPlay: v.string(),
    roomCode: v.string(),
    players: v.array(
      v.object({
        id: v.string(),
        username: v.string(),
        score: v.number(),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_roomCode", ["roomCode"]),
});

export default schema;
