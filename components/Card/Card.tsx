import React from "react";

import { cn } from "@/utils/classes";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white shadow-md rounded-md p-4 dark:bg-gray-800 dark:text-white",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export default Card;
