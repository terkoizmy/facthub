"use client";

import { useUser } from "@clerk/clerk-react"
import { api } from "@/../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";


export default function ProfilePage () {
  const { user } = useUser()
  // const getProfile = useQuery(api.user.getProfile);
  // const [convexUser, setConvexUser] = useState(null)
  
  // useEffect(  () =>  {

  //   const fetchUser = async () => {
  //     const userProfile = await getProfile({ clerkId: user?.id });
  //     setConvexUser(userProfile)
  //   }

  //   fetchUser()

  // }, [user, getUser])

  // console.log(getUser)

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>
        profile header
      </div>
      <div>
        posting article user profile
      </div>
    </div>
  )
}