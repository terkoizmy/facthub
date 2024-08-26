import { mutation, query } from "./_generated/server.js";
// import { mutationGeneric } from "convex/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkId, email, name } = args;

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      bio: "", 
    joinedAt: Date.now(), 
    });
    
    return userId;
  },
});

export const getUser =  query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.clerkId) return null;
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
    return user;
  },
});

export const getProfile  =  query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.clerkId) return null;
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found in Convex database");
    }

    const article = await ctx.db
    .query("newsArticles")
    .filter((q) => q.eq(q.field("authorId"), user._id))
    .collect()

    return {
      user,
      article,
    };
  },
});