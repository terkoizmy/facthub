"use client";


import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Doc } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Author extends Doc<"users"> {
}

interface Article extends Doc<"newsArticles"> {
  author: Author;
}

interface ArticleSectionProps {
  article: Article;
}

function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // @ts-ignore
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default function ArticleSection( { article } : ArticleSectionProps)  {
  const { user } = useUser()
  const pathname = usePathname()
  console.log(pathname)

  return (
    <>
      <Card className="flex flex-col  min-w-[100px] max-w-[850px]">
        <div className="flex items-center space-x-4 mx-4 my-4 justify-between">
          <div className="flex items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={article?.author?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mx-5">
              <h3 className="font-bold text-lg">{article?.author?.name} · {`Follow`}</h3>
              <div>
                {formatTimestamp(article?.createdAt)}
              </div>
            </div>
          </div>
          {article?.author?.clerkId == user?.id &&
            <div>
              <Link href={`${pathname}/edit`} >
                <Button>
                  Edit your Article
                </Button>
              </Link>
            
          </div>
          }
          
        </div>
        <h1 className="text-3xl font-bold my-4 mx-4 flex flex-wrap  ">{article?.title}</h1>
        <CardContent className="px-2 py-0 pb-2 mb-20 ">
          <div className="mt-2 mx-0 px-0 relative w-full aspect-video rounded-3xl overflow-hidden  ">
            <Image 
              src={article?.thumbnailUrl}
              alt={"dummy alt"}
              fill
            />
          </div>
        </CardContent>
        <div className="prose prose-lg flex flex-col ml-10 ">
          <ReactMarkdown remarkPlugins={[remarkGfm]} >{article?.content}</ReactMarkdown>
        </div>
      </Card>
    </>
  );
}
