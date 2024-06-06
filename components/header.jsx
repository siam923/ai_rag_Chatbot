/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { auth } from '@/auth'
import { Button, buttonVariants } from "@/components/ui/button";
import { IconNextChat } from "@/components/ui/icons";

// import { Session } from '@/lib/types'

export function Header() {
  return (
    <header className="fixed  top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <Link href="/" className="flex items-center">
            <IconNextChat className="w-10 h-10 " />
            <h1 id="logo" className=" text-md font-bold">
              SNR Assistant
            </h1>
          </Link>
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end gap-2"></div>
    </header>
  );
}
