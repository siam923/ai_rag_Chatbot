import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";

// type : MemoizedReactMarkdown: FC<Options>

export const MemoizedReactMarkdown = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);
