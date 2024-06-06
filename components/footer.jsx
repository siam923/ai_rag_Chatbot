import React from "react";

import { cn } from "@/lib/utils";

//props type : React.ComponentProps<'p'>

export function FooterText({ className, ...props }) {
  return (
    <p
      className={cn(
        "px-2 text-center text-xs leading-normal text-gray-500",
        className
      )}
      {...props}
    >
      Open source AI chatbot built with Sense & Respond LLC.
    </p>
  );
}
