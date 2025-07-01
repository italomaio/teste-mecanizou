import * as React from "react";

import { cn } from "@/utils/classes";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        role="textbox"
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-sm bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sapphire text-gray-700 dark:text-zinc-100 border border-sapphire",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
