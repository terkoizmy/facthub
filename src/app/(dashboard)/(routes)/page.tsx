"use client"

import { NewsCard } from "@/components/news-card"
import { useQuery } from "convex/react";
import { api } from "@/../../convex/_generated/api";

export default function Home() {
  const newsArticle = useQuery(api.newsArticle.getArticlesWithAuthors, { limit: 10, skip: 0 });

  console.log(newsArticle)

  return (
    <main className="flex flex-row gap-5 mx-5 my-5 flex-wrap " >
      {newsArticle?.map((article, index) => (
        <NewsCard key={index} author={article.author} title={article.title} 
        tags={article.tags} category={article.category} thumbnail={article.thumbnailUrl} />
      ))} 
    </main>
  )
}
