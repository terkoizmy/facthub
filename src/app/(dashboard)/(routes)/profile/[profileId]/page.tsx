"use client";

import { useUser } from "@clerk/clerk-react"
import { api } from "@/../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";


export default function ProfilePage () {
  const { user } = useUser()
  // const [convexUser, setConvexUser] = useState({})
  const userProfile = useQuery(api.user.getProfile,{ clerkId: user?.id });


  console.log(userProfile)

  return (
    <div className="h-full w-full flex flex-row items-center ">
      <div className="flex h-auto bg-slate-500 w-7/12">
        profile header
      </div>
      <div className="flex h-auto bg-red-400 w-5/12 ">
        posting article user profile
      </div>
    </div>
  )
}