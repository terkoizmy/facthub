"use client";


import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Doc } from "@/../convex/_generated/dataModel";

interface Author extends Doc<"users"> {
}

interface Article extends Doc<"newsArticles"> {
  author: Author;
}

interface ArticleSectionProps {
  article: Article;
}

export default function ArticleSection( { article } : ArticleSectionProps)  {

  return (
    <>
    <Card >
      <div className="flex items-center space-x-4 mx-4 my-4 ">
        <Avatar className="w-8 h-8">
          <AvatarImage src={article?.author?.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-lg">{article?.author?.name} · {`Follow`}</h3>
        </div>
      </div>
      <h1 className="text-3xl font-bold my-4 mx-4 ">{article?.title}</h1>
      <CardContent className="px-2 py-0 pb-2 ">
        <div className="mt-2 mx-0 px-0 relative w-full aspect-video rounded-3xl overflow-hidden  ">
          <Image
            src={article?.thumbnailUrl}
            alt={"dummy alt"}
            fill
          />
        </div>
      </CardContent>
      <div className="prose prose-lg flex justify-center flex-col m-5 ">
        <ReactMarkdown remarkPlugins={[remarkGfm]} >{article?.content}</ReactMarkdown>
      </div>
    </Card>
    </>
  );
}
