"use client"

import { NewsCard } from "@/components/news-card"
import { useQuery } from "convex/react"
import { api } from "@/../../convex/_generated/api"

export default function Home() {
  const newsArticle = useQuery(api.newsArticle.getArticlesWithAuthors, {
    limit: 10,
    skip: 0,
  })

  console.log(newsArticle)

  return (
    <main className="custom-grid w-full p-4">
      {newsArticle?.map((article, index) => (
        <NewsCard
          key={index}
          author={article.author}
          title={article.title}
          tags={article.tags}
          category={article.category}
          thumbnail={article.thumbnailUrl}
        />
      ))}
    </main>
  )
}
