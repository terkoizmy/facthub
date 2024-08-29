"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Doc } from "@/../convex/_generated/dataModel";
import { ThumbsUp,ThumbsDown, MessageSquare, Bookmark, BookmarkCheck } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookmarkPlus, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CardNewsProps {
  article: Doc<"newsArticles"> & {
    author: any & {
      id: string;
      name: string;
      email: string;

      imageUrl: string;
    };
    commentCount: number
  }
}

export const NewsCard = ({
  article
}: CardNewsProps) => {
  const upvote = useMutation(api.votes.upvote);
  const downvote = useMutation(api.votes.downvote);
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(0);
  const [optimisticDownvotes, setOptimisticDownvotes] = useState(0);

  const handleUpvote = async (articleId: any) => {
    setOptimisticUpvotes(prev => prev + 1);
    await upvote({ articleId });
  };

  const handleDownvote = async (articleId: any) => {
    setOptimisticDownvotes(prev => prev + 1);
    await downvote({ articleId });
  };

  const handleOnClick = () => {
    console.log("hello world")
  }
  return (
    <>
      <Card
        id="card-article"
        className="rounded-lg hover:border-black dark:hover:border-gray-600 hover:cursor-pointer max-h-[800px] h-full relative overflow-hidden"
      >
        <CardHeader className="pb-1 mb-1 px-4">
          <div className="flex justify-between">
            <div className="flex flex-row">
              <Avatar className="w-8 h-8">
                <AvatarImage src={article.author.imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex justify-center items-center mx-2">
                <Label htmlFor="email">{article.author.name}</Label>
              </div>
            </div>
            
            <div id="article-read" className="gap-2 hidden">
              <Button
                className="h-8 px-2 rounded-xl bg-black dark:bg-white"
                onClick={handleOnClick}
              >
                <BookmarkPlus className="w-5 h-5 mr-1" />
                Bookmark
              </Button>
            </div>
          </div>
        </CardHeader>
        <Link href={`/article/${article._id}`} target="_blank">
          <CardContent className="px-2 py-0 pb-2 h-[320px] ">
            <div className="mt-2 font-extrabold text-lg flex overflow-hidden h-[80px] ">
              {article.title} 
            </div>
            <div className="flex justify-start text-[0.65rem] gap-2 mt-2">
              {article.tags.map((_, index) =>
                index < 2 ? (
                  <span key={index} className="p-1 rounded-lg px-2 border-[1px] border-black ">
                    {`#${_.toLocaleLowerCase()}`}
                  </span>
                ) : (
                  index === article.tags.length - 1 && (
                    <span key={index} className="p-1 rounded-lg px-2 border-[1px] border-black">{`+${index - 1}`}</span>
                  )
                )
              )}
            </div>
            <div className="mt-2 mx-0 px-0 relative  h-[200px] w-full aspect-video rounded-md overflow-hidden ">
              <Image
                src={article.thumbnailUrl}
                alt={"dummy alt"}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Link>
        <CardFooter>
          <div className="flex justify-between items-center text-zinc-400 w-full mt-2">
            <Button variant="ghost" size="sm" onClick={() => {handleUpvote(article._id)}}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              {article.upvotes}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {handleDownvote(article._id)}}>
              <ThumbsDown className="mr-2 h-4 w-4" />
              {article.downvotes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              {article?.commentCount}
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="mr-1 h-4 w-4" />
            </Button>
          </div>

        </CardFooter>
      </Card>
    </>
  )
}
