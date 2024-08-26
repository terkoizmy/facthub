"use client";

import { useUser } from "@clerk/clerk-react"
import ItemSection from "./_components/item-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // @ts-ignore
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default function ProfilePage () {
  const { user } = useUser()

  if (!user) {
    return <div>Loading...</div>; // Or handle this case however you like
  }

  const userProfile = useQuery(api.profile.getUserProfile, { clerkId: user.id })

  console.log(userProfile)

  return (
    <div className="h-full w-full flex flex-row ">
      <div className="flex flex-col h-full w-7/12 border-r-2">
        <ItemSection userId={user?.id} />
      </div>
      <div className="flex flex-col w-5/12 ">
        <div className="flex font-bold text-xl items-center h-[52px] ml-3">
          Profile
        </div>
        <div className="border-t-2 w-full " />
        {!userProfile ? <div>Loading...</div> :
        <Card className="w-full p-3 flex flex-col " >
          <div className="flex flex-row">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userProfile?.user?.imageUrl} />
            </Avatar>
            <div className="flex flex-col ml-5 mt-2 ">
              <div className="font-bold text-xl flex items-center">
                {userProfile?.user?.name}
              </div>
              <div className="flex flex-wrap">
                @{ userProfile?.user?.name?.toLowerCase().replace(/\s+/g, '')} 
                <div className="text-slate-500"> 
                &nbsp; • Joined {formatTimestamp(userProfile?.user?._creationTime)}
                </div>
              </div>
            </div>
          </div>

          <div className="font-bold flex mt-6">
            {userProfile?.articlesUser?.length} <div className="text-slate-500">&nbsp; Posts &nbsp; </div>
            &nbsp; {userProfile?.countFollowers}  <div className="text-slate-500">&nbsp; Followers &nbsp; </div>
            &nbsp; {userProfile?.upvotes}<div className="text-slate-500">&nbsp; Upvotes &nbsp; </div>
          </div>
            
          
        </Card>
         }
        
          
        

      </div>
    </div>
  )
}