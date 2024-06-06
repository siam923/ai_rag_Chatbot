"use client";

import * as React from "react";

// export interface useCopyToClipboardProps {
//   timeout?: number
// }

export function useCopyToClipboard({ timeout = 2000 }) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = (value) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
