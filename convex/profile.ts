import { mutation, query } from "./_generated/server.js";
// import { mutationGeneric } from "convex/server";
import { v } from "convex/values";

export const getUserProfile =  query({
  args: { profileId: v.id("users")},
  handler: async (ctx, args) => {
    const { db, storage} = ctx
    const { profileId } = args

    if (!profileId) return {};
    const user = await db
    .query("users")
    .filter((q) => q.eq(q.field("_id"), profileId), )
    .unique();

    if (!user) throw new Error("User not found in Convex database"); 

    const articlesUser = await db
    .query("newsArticles")
    .withIndex("authorId", (q) => q.eq("authorId", user._id))
    .order("desc")
    .collect()

    const countFollowers = await db
    .query("follows")
    .filter((q) => q.eq(q.field('followedId'), user._id))
    .collect()

    const votes = await db
    .query("votes")
    .filter((q) => q.eq(q.field('userId'), user._id))
    .collect()

    return {
      user,
      articlesUser,
      countFollowers: countFollowers.length,
      upvotes: votes.length,
    };
  },
});