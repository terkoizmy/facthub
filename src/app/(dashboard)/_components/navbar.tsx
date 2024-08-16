"use client";

import { NavbarRoutes } from "@/components/navbar-routes"


export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm ">

      {/* Buat Resposive Mobilenya nanti */}
      {/* <MobileSidebar /> */}
      <NavbarRoutes /> 
    </div>
  )
}