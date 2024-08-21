import { mutation } from "./_generated/server.js";
import { query } from "./_generated/server";
// import { mutationGeneric } from "convex/server";
import { v } from "convex/values";

export const createNewsArticle = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    htmlContent: v.string(),
    thumbnailUrl: v.string(),
    authorId: v.id("users"),
    tags: v.array(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const newsArticleId = await ctx.db.insert("newsArticles", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      upvotes: 0,
      downvotes: 0,
    });
    return newsArticleId;
  },
});

export const getArticlesWithAuthors = query({
  args: {
    limit: v.optional(v.number()),
    skip: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const { limit = 10, skip = 0 } = args;

    // Fetch articles
    const articles = await db.query("newsArticles")
      .order("desc")
      .take(skip + limit);

    // Fetch author data for each article
    const articlesWithAuthors = await Promise.all(
      articles.slice(skip).map(async (article) => {
        const author = await db.get(article.authorId);
        return {
          ...article,
          author: author ? {
            id: author._id,
            name: author.name,
            email: author.email,
            imageUrl: author.imageUrl,
          } : null,
        };
      })
    );

    return articlesWithAuthors;
  },
});

export const getArticleWithAuthor = query({
  args: {
    articleId: v.id("newsArticles"),
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const { articleId } = args;

    const article = await db.get(articleId);

    if (!article) {
      return { article: null };
    }

    const author = await db.get(article.authorId);

    return {
      ...article,
      author
    };
  },
});

