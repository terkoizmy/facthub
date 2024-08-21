"use client";
import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react"
import { useParams } from 'next/navigation'

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Doc } from "@/../convex/_generated/dataModel";

interface Author extends Doc<"users"> {
}

interface NewsArticle extends Doc<"newsArticles"> {
  author: Author;
}

export default function PostArticle()  {
  const { articleId } = useParams()

  // @ts-ignore
  const newsArticle = useQuery(api.newsArticle.getArticleWithAuthor, { articleId }) as NewsArticle | undefined;
  // console.log(articleId)
  console.log(newsArticle)

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
    <main className="flex flex-col items-center justify-between ">
      <div className="max-w-3xl mx-auto py-10">
        <Card>
          <div className="flex items-center space-x-4 mx-4 my-4 ">
            <Avatar className="w-8 h-8">
              <AvatarImage src={newsArticle?.author!.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{newsArticle.author.name} · {`Follow`}</h3>
            </div>
          </div>
          <h1 className="text-3xl font-bold my-4 mx-4 ">{newsArticle.title}</h1>
          <CardContent className="px-2 py-0 pb-2 ">
            <div className="mt-2 mx-0 px-0 relative w-full aspect-video rounded-3xl overflow-hidden  ">
              <Image
                src={newsArticle.thumbnailUrl}
                alt={"dummy alt"}
                fill
              />
            </div>
          </CardContent>
          <div className="prose prose-lg flex justify-center flex-col m-5 ">
            <ReactMarkdown remarkPlugins={[remarkGfm]} >{newsArticle.content}</ReactMarkdown>
          </div>
        </Card>
      </div>
    </main>
  );
}
