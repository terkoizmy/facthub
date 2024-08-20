"use client"

import { NewsCard } from "@/components/news-card"
import { useQuery } from "convex/react";
import { api } from "@/../../convex/_generated/api";

export default function Home() {
  const newsArticle = useQuery(api.newsArticle.getArticlesWithAuthors, { limit: 10, skip: 0 });

  console.log(newsArticle)

  return (
    <main className="flex flex-row gap-5 mx-5 my-5 flex-wrap " >
      {newsArticle?.map((articleNews, index) => (
          <NewsCard key={index} article={articleNews} />
      ))} 
    </main>
  )
}
