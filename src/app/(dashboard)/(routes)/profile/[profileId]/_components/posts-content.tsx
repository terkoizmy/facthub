"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Bookmark, Link } from "lucide-react"

interface ArticlesProps{
  userId: string
}

export default function PostContent({ userId }: ArticlesProps) {
  // console.log(article)
  return (
    <div>
      Post Content
      {/* {article.map((data: any, index: number)=>(
        <div>
        {data._id}
        </div>
      )) } */}
    </div>
  )
}
