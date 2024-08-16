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

export default function Home() {
  const tags = ["Javascript", "Typescript", "Nextjs"]

  const handleOnClick = () => {
    console.log("hello world")
  }
  return (
    <main className="flex flex-col justify-between p-5">
      <article>
        <Card
          id="card-article"
          className="w-[280px] rounded-3xl hover:border-black dark:hover:border-gray-600 hover:cursor-pointer"
        >
          <CardHeader className="pb-1 mb-1 px-4">
            <div className="flex justify-between">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div id="article-read" className="gap-2 hidden">
                <Button
                  className="h-8 px-2 rounded-xl bg-black dark:bg-white"
                  onClick={handleOnClick}
                >
                  Read Post
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  className="h-8 px-2 rounded-xl hover:bg-gray-600 bg-transparent text-white  dark:bg-transparent dark:hover:bg-gray-600 bg-black"
                  onClick={handleOnClick}
                >
                  <EllipsisVertical className="px-0 w-5 " />
                </Button>
              </div>
            </div>
            <CardTitle>
              <div className="mt-2 font-extrabold text-lg">
                100 Free Coding Challange
              </div>
              <div className="flex justify-start text-[0.65rem] gap-2 mt-2">
                {tags.map((_, index) =>
                  index < 2 ? (
                    <span className="p-1 rounded-lg px-2 border-[1px] border-black">
                      {`#${_.toLocaleLowerCase()}`}
                    </span>
                  ) : (
                    index === tags.length - 1 && (
                      <span className="p-1 rounded-lg px-2 border-[1px] border-black">{`+${index - 1}`}</span>
                    )
                  )
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 py-0 pb-2 ">
            <div className="mt-2 mx-0 px-0 overflow-auto rounded-3xl">
              <Image
                src={
                  "https://i.pinimg.com/564x/d2/0b/36/d20b362a9cf422dd0e056bf32ddde12c.jpg"
                }
                width={400}
                height={200}
                alt={"dummy alt"}
              />
            </div>
          </CardContent>
        </Card>
      </article>
    </main>
  )
}
