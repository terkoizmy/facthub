'use client';
import { useEffect } from "react";

import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const createUser = useMutation(api.createUser.createUser);

  useEffect(() => {
    if (user) {
      createUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || "",
      });
    }
  }, [user, createUser]);
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar/>
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
      
    </div>
  );
}
 
export default DashboardLayout;