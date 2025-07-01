import React from "react";

import { cn } from "@/utils/classes";

const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-zinc-400/10",
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
