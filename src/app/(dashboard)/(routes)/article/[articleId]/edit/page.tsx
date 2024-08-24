"use client";

import { usePathname, useParams } from "next/navigation";


export default function EditPost()  {
  const { articleId } = useParams()
  console.log(articleId)

  return (
    <main className="flex flex-col items-center justify-between p-24">
      Ini page Edit POST
    </main>
  );
}
