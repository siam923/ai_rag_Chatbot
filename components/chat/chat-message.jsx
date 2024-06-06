"use client";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
// import { CodeBlock } from "@/components/ui/codeblock";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { IconGemini, IconUser } from "@/components/ui/icons";
// import { ChatMessageActions } from '@/components/chat-message-actions';

export function ChatMessage({ message, ...props }) {
  return (
    <div className={cn("group relative mb-6  flex items-start")} {...props}>
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-lg border shadow",
          message.role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.role === "user" ? <IconUser /> : <IconGemini />}
      </div>
      <div className="flex-1 px-1 my-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        {/* <ChatMessageActions message={message} /> */}
      </div>
    </div>
  );
}
