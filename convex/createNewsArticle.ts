import { v } from "convex/values";
import { mutation } from "./_generated/server";

export default mutation({
  args: {
    title: v.string(),
    content: v.string(),
    htmlContent: v.string(),
    thumbnailUrl: v.string(),
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const newsArticleId = await ctx.db.insert("newsArticles", {
      title: args.title,
      content: args.content,
      htmlContent: args.htmlContent,
      thumbnailUrl: args.thumbnailUrl,
      authorId: args.authorId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      upvotes: 0,
      downvotes: 0,
    });
    return newsArticleId;
  },
});