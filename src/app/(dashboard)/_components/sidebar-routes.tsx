"use client";

import { Layout, List, BarChart, Telescope   } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/analytics"
  },
  {
    icon: Telescope,
    label: "Explore",
    href: "/explore"
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname()
  const isTeacherPage = pathname?.includes("/teacher")
  // const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route)=>(
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      )) }
    </div>
  )
}