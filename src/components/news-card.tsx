"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Doc } from "@/../convex/_generated/dataModel";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EllipsisVertical, ExternalLink } from "lucide-react"
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
  }
}

export const NewsCard = ({
  article
}: CardNewsProps) => {
  const handleOnClick = () => {
    console.log("hello world")
  }
  return (
    <>
      <Link href={`/post/${article._id}`} target="_blank">
        <Card
          id="card-article"
          className="rounded-3xl hover:border-black dark:hover:border-gray-600 hover:cursor-pointer max-h-[350px] h-full relative overflow-hidden"
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
                  Follow
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            <CardTitle>
              <div className="mt-2 font-extrabold text-lg">
                {article.title}
              </div>
              <div className="flex justify-start text-[0.65rem] gap-2 mt-2">
                {article.tags.map((_, index) =>
                  index < 2 ? (
                    <span key={index} className="p-1 rounded-lg px-2 border-[1px] border-black">
                      {`#${_.toLocaleLowerCase()}`}
                    </span>
                  ) : (
                    index === article.tags.length - 1 && (
                      <span key={index} className="p-1 rounded-lg px-2 border-[1px] border-black">{`+${index - 1}`}</span>
                    )
                  )
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 py-0 pb-2 h-[400px] bottom-1 ">
            <div className="mt-2 mx-0 px-0 relative w-full h-[200px] aspect-video rounded-3xl overflow-hidden  ">
              <Image
                src={article.thumbnailUrl}
                alt={"dummy alt"}
                fill
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}
