"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const inter = Inter({ subsets: ["latin"] });

// tolong di ubah pake .env stringya 
const convex = new ConvexReactClient("https://famous-beagle-49.convex.cloud");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    // tolong di ubah pake .env stringya 
    <ClerkProvider publishableKey="pk_test_c3RpcnJlZC1haXJlZGFsZS0zOS5jbGVyay5hY2NvdW50cy5kZXYk">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ConvexProviderWithClerk>
    </ClerkProvider>

      
  );
}
