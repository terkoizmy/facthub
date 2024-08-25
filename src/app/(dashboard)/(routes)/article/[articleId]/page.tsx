"use client";
import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react"
import { useParams } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@/../convex/_generated/dataModel";

import ArticleSection from "./_components/article-section";
import CommentSection from "./_components/comment-section";

interface Author extends Doc<"users"> {
}

interface NewsArticle extends Doc<"newsArticles"> {
  author: Author;
}

export default function PostArticle()  {
  const { articleId } = useParams() ; 
  // @ts-ignore
  const newsArticle = useQuery(api.newsArticle.getArticleWithAuthor, { articleId }) as NewsArticle | undefined;  
  
  if (!newsArticle) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Skeleton className="w-full max-w-3xl h-10" />
        <Skeleton className="w-full max-w-3xl h-5 mt-4" />
        <Skeleton className="w-full max-w-3xl h-5 mt-4" />
        <Skeleton className="w-full max-w-3xl h-5 mt-4" />
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-center gap-3 p-5 ">
        <ArticleSection article={newsArticle} />
        <CommentSection />
    </main>
  );
}
