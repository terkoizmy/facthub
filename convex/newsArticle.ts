import { mutation } from "./_generated/server.js";
import { query } from "./_generated/server";
// import { mutationGeneric } from "convex/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";


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
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { db } = ctx;

    // Fetch articles

    console.log("FATCHING DATA")
    const paginatedArticles = await db.query("newsArticles")
      .order("desc")
      .paginate(args.paginationOpts);

    // Fetch author data for each article
    const articlesWithAuthors = await Promise.all(
      paginatedArticles.page.map(async (article) => {
        const author = await db.get(article.authorId);
        return {
          ...article,
          author: author,
        };
      })
    );

    return {
      page: articlesWithAuthors,
      continueCursor: paginatedArticles.continueCursor,
    };
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

