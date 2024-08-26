"use client";

import { useUser } from "@clerk/clerk-react"
import { api } from "@/../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Children, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tabs = [
  { name: 'Readme', href: '/profile/readme' },
  { name: 'Posts', href: '/profile/posts' },
  { name: 'Replies', href: '/profile/replies' },
  { name: 'Upvoted', href: '/profile/upvoted' },
];


export default function ProfilePage () {
  const { user } = useUser()
  const router = useRouter();
  // const [convexUser, setConvexUser] = useState({})
  const userProfile = useQuery(api.user.getProfile,{ clerkId: user?.id });

  console.log(userProfile)

  return (
    <div className="h-full w-full flex flex-row items-center ">
      <div className="flex h-full w-7/12 border-r-2">
        {/* <div className="flex space-x-4">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === tab.href
                  ? 'bg-gray-800 text-white'
                  : 'hover:bg-gray-700'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div> */}
      </div>
      <div className="flex h-full w-5/12 ">
        profile section
      </div>
    </div>
  )
}