"use client";

import { UserButton, SignInButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/button-toggle"
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button"
import { LogOut, BookPlus, CircleUserRound  } from "lucide-react";
import { SearchInput } from "./search-input";
import { useUser } from "@clerk/nextjs";
import { api } from "@/../convex/_generated/api";
import { useQuery  } from 'convex/react';


export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter()

  const convexUser = useQuery(api.user.getUser);

  if (!convexUser) {
    return <div>Loading...</div>; // Or handle this case however you like
  }

  const isCreateArrticlePage = pathname?.startsWith('/article');
  // const isCoursePage = pathname?.includes("/create");
  const isSearchPage = pathname === "/search";

  const toProfile = (userId: string) => {
    router.push(`/profile/${userId}`)
  }

  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>

      <div className="flex gap-x-2 ml-auto">
        <div>
          <ModeToggle />
        </div>

        {convexUser && (
          <>
          {isCreateArrticlePage  ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2"  />
                Exit
              </Button> 
            </Link>
            
          ) : (
            <Link href="/article/create">
              <Button size="sm" variant="ghost" >
                <BookPlus className="h-4 w-4 mr-2"  />
                Post
              </Button>
            </Link>
          )}
          </>
          )}
        
        <Unauthenticated>
          <Button size="sm" variant="ghost" >
            <SignInButton  />
          </Button>
          
          {/* <Link href="/sign-in">
            <Button>
              Sign In
            </Button>
          </Link> */}
        </Unauthenticated>
        <Authenticated>
          <UserButton >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Profile"
                labelIcon={<CircleUserRound />}
                onClick={() => toProfile(convexUser._id)}
              />
            </UserButton.MenuItems>
          </UserButton>
        </Authenticated>
      </div>
    </>
  )
}