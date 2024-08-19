"use client";

import CreateNews from "./_components/create-news";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from '@/../../convex/_generated/api';
import { useEffect } from "react";

export default function CreatePost() {
  const { user } = useUser();
  
  const getUser = useMutation(api.getUser.default);
  // const {userId} = useAuth();
  console.log(user)
  
  return (
    <div className="mx-5 my-5">
      <CreateNews userId={user?.id} />
    </div>
  );
}