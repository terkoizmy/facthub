"use client";

import { UserButton, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/button-toggle"
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button"
import { LogOut, BookPlus } from "lucide-react";
import { SearchInput } from "./search-input";


export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/post');
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>

      <div className="flex gap-x-2 ml-auto">
        <div>
          <ModeToggle />
        </div>

        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2"  />
              Exit
            </Button> 
          </Link>
          
        ) : (
          <Link href="/post/create">
            <Button size="sm" variant="ghost" >
              <BookPlus className="h-4 w-4 mr-2"  />
              Post
            </Button>
          </Link>
        )}
        
        
        <Unauthenticated>
          {/* <SignInButton /> */}
          <Link href="/sign-in">
            <Button>
              Sign In
            </Button>
          </Link>
          
        </Unauthenticated>
        <Authenticated>
          <UserButton  />
        </Authenticated>
      </div>
    </>
  )
}