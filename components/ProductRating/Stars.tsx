"use client";

import React, { memo } from "react";
import { cn } from "@/utils/classes";
import { Star } from "lucide-react";

export type StarsProps = {
  rating: number;
};

const Stars: React.FC<StarsProps> = ({ rating }) => {
  return (
    <div className="flex flex-row gap-[3px]">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={15}
          className={cn(
            index < rating
              ? "dark:text-yellow-300 text-yellow-500"
              : "dark:text-white text-gray-700"
          )}
        />
      ))}
    </div>
  );
};

export default memo(Stars);
