import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
  }),
  newsArticles: defineTable({
    title: v.string(),
    content: v.string(),
    thumbnailUrl: v.string(),
    authorId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
    upvotes: v.number(),
    downvotes: v.number(),
  }),
  comments: defineTable({
    articleId: v.id("newsArticles"),
    authorId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }),
  votes: defineTable({
    articleId: v.id("newsArticles"),
    userId: v.id("users"),
    voteType: v.union(v.literal("upvote"), v.literal("downvote")),
  }),
});