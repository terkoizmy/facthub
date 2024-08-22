"use client";

import { useQuery, useMutation } from "convex/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Comment({ comment, onReply }: any) {
  const [newReply, setNewReply] = useState("");
  // const addReplyMutation = useMutation(addReply);

  const handleReplySubmit = async () => {
    if (newReply.trim()) {
      console.log("Submit bitch", newReply)
      // await addReplyMutation({ commentId: comment._id, content: newReply });
      setNewReply("");
    }
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start space-x-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment?.author?.name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold">{comment.author.name}</h4>
          <p>{comment.content}</p>
          <div className="flex items-center space-x-4 mt-2">
            <Input
              placeholder="Write a reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            />
            <Button onClick={handleReplySubmit}>Reply</Button>
          </div>
        </div>
      </div>
      {comment.replies.map((reply: any, index: number) => (
        <div key={reply._id} className="ml-12 mt-4">
          <Comment comment={reply} onReply={onReply} />
        </div>
      ))}
    </Card>
  );
}

export default function CommentSection({ articleId }: any) {
  const [newComment, setNewComment] = useState("");
  // const comments = useQuery(getArticleComments, { articleId });
  // const addCommentMutation = useMutation(addComment);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      console.log("YAYYY")
      // await addCommentMutation({ articleId, content: newComment });
      setNewComment("");
    }
  };

  // if (!comments) {
  //   return (
  //     <div className="mt-8">
  //       <Skeleton className="w-full max-w-3xl h-10" />
  //       <Skeleton className="w-full max-w-3xl h-10 mt-4" />
  //       <Skeleton className="w-full max-w-3xl h-10 mt-4" />
  //     </div>
  //   );
  // }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <Card>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-10 h-10 ">
            {/* <AvatarImage src={comment?.author?.name} /> */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleCommentSubmit}>Submit</Button>
        </div>
        {/* {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))} */}
      </Card>
    </div>
  );
}


