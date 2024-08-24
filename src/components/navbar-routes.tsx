"use client";

import { UserButton, SignInButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/button-toggle"
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button"
import { LogOut, BookPlus } from "lucide-react";
import { SearchInput } from "./search-input";


const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter()

  const isCreateArrticlePage = pathname?.startsWith('/article');
  // const isCoursePage = pathname?.includes("/create");
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
        
        <Unauthenticated>
          <SignInButton />
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
                labelIcon={<DotIcon />}
                onClick={() => router.push('/profile/Me')}
              />
            </UserButton.MenuItems>
          </UserButton>
        </Authenticated>
      </div>
    </>
  )
}