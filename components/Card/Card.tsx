import React from "react";

import { cn } from "@/utils/classes";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white shadow-md rounded-md p-4 dark:bg-zinc-800 dark:text-white dark:border dark:border-zinc-700 dark:shadow-none",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export default Card;
