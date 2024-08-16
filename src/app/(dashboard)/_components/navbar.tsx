"use client"

import { NavbarRoutes } from "@/components/navbar-routes"
import { ModeToggle } from "@/components/button-toggle"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm justify-end">
      <ModeToggle />
      {/* Buat Resposive Mobilenya nanti */}
      {/* <MobileSidebar /> */}
      {/* <NavbarRoutes /> */}
    </div>
  )
}
