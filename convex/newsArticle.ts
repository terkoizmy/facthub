import { mutation } from "./_generated/server.js";
import { query } from "./_generated/server";
// import { mutationGeneric } from "convex/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getArticle = query({
  args: {
    articleId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    if (!args.articleId) {
      throw new Error("Article not found in database");
    }

    const article = await db
    .query("newsArticles")
    .filter((q) => q.eq(q.field("_id"), args.articleId))
    .unique()

    return {
      ...article
    }
  },
})

// Get user's articles
const getUserArticles = query({
  args: { userId: v.id("users"), limit: v.number() },
  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("newsArticles")
      .withIndex("authorId", (q) => q.eq("authorId", args.userId))
      .order("desc")
      .take(args.limit);
    return articles;
  },
});

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
      viewCount: 0,
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
    const paginatedArticles = await db.query("newsArticles")
      .order("desc")
      .paginate(args.paginationOpts);

    // Fetch author data and comment count for each article
    const articlesWithAuthorsAndCommentCount = await Promise.all(
      paginatedArticles.page.map(async (article) => {
        const [author, commentCount] = await Promise.all([
          db.get(article.authorId),
          db.query("comments")
            .filter((q) => q.eq(q.field("articleId"), article._id))
            .collect()
            .then((comments) => comments.length)
        ]);

        return {
          ...article,
          author: author,
          commentCount: commentCount,
        };
      })
    );

    return {
      page: articlesWithAuthorsAndCommentCount,
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

export const editArticle = mutation({
  args: {
    articleId: v.id("newsArticles"),
    clerkId: v.string(),
    // @ts-ignore
    articleData: v.object({
      title: v.string(),
      content: v.string(),
      htmlContent: v.string(),
      thumbnailUrl: v.string(),
      authorId: v.id("users"),
      tags: v.array(v.string()),
      category: v.string(),
    }) ,
  },
  handler: async (ctx, args) => {
    const { db } = ctx
    const { articleId, clerkId, articleData } = args

    const checkUser = await db
    .query("users")
    .filter((q) => q.eq(q.field("clerkId"), clerkId))
    .unique();

    if(checkUser?._id != articleData.authorId){
      throw new Error("You are not the author on this article");
    }
    
    await db.patch(articleId, {
      ...articleData
    })

    return {
      msg: "Article success update"
    } 
  },
})

export const deleteArticle = mutation({
  args: {
    articleId: v.id("newsArticles"),
    clerkId: v.string(),
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { db } = ctx
    const { articleId, clerkId, authorId } = args

    const checkUser = await db
    .query("users")
    .filter((q) => q.eq(q.field("clerkId"), clerkId))
    .unique();

    if(checkUser?._id != authorId){
      throw new Error("You are not the author on this article");
    }
    
    await db.delete(articleId)

    return {
      msg: "Article success delete"
    } 
  },
})