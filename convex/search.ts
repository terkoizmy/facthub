import { query } from "./_generated/server";
import { v } from "convex/values";

// Simple word embedding function
function simpleEmbed(text: string): number[] {
  const words = text.toLowerCase().split(/\W+/);
  const embedding = new Array(100).fill(0);
  words.forEach((word, i) => {
    const hash = word.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
    embedding[Math.abs(hash) % 100] += 1;
  });
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / magnitude);
}

// Cosine similarity function
function cosineSimilarity(a: number[], b: number[]): number {
  return a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
}

export const searchArticles = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const { searchTerm } = args;

    // Fetch all articles (in a real app, you'd want to paginate this)
    let articles = await ctx.db.query("newsArticles")
    .withSearchIndex("search_title", (q) => q.search("title", searchTerm))
    .collect()

    return articles
  },
});

export const getCategories = query({
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const getTags = query({
  handler: async (ctx) => {
    const articles = await ctx.db.query("newsArticles").collect();
    const tags = new Set(articles.flatMap(a => a.tags));
    return Array.from(tags);
  },
});