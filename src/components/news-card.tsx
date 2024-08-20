"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EllipsisVertical, ExternalLink } from "lucide-react"
import Image from "next/image"

interface CardNewsProps {
  author: any;
  title: string;
  tags: string[];
  category: string;
  thumbnail: string;
}

export const NewsCard = ({
  author,
  title,
  tags,
  category,
  thumbnail,
}: CardNewsProps) => {
  const tagss = ["Javascript", "Typescript", "Nextjs"]

  const handleOnClick = () => {
    console.log("hello world")
  }
  return (
    <>
      <Card
        id="card-article"
        className="w-[280px] rounded-3xl hover:border-black dark:hover:border-gray-600 hover:cursor-pointer"
      >
        <CardHeader className="pb-1 mb-1 px-4">
          <div className="flex justify-between">
            <Avatar className="w-8 h-8">
              <AvatarImage src={author.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
              {title}
            </div>
            <div className="flex justify-start text-[0.65rem] gap-2 mt-2">
              {tags.map((_, index) =>
                index < 2 ? (
                  <span key={index} className="p-1 rounded-lg px-2 border-[1px] border-black">
                    {`#${_.toLocaleLowerCase()}`}
                  </span>
                ) : (
                  index === tags.length - 1 && (
                    <span key={index} className="p-1 rounded-lg px-2 border-[1px] border-black">{`+${index - 1}`}</span>
                  )
                )
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 py-0 pb-2 ">
          <div className="mt-2 mx-0 px-0 relative w-full aspect-video rounded-3xl overflow-hidden ">
            <Image
              src={thumbnail}
              width={400}
              height={200}
              alt={"dummy alt"}
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
