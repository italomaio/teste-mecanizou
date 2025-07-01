"use client";

import React, { useCallback } from "react";
import { Button, ButtonVariant } from "@/components";
import { ChevronLeft, ChevronRight, LucideProps } from "lucide-react";
import { cn } from "@/utils/classes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const iconProps: LucideProps = {
  size: 20,
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  return (
    <nav
      className="pagination flex flex-row items-center gap-1"
      aria-label="Pagination Navigation"
    >
      <Button
        disabled={currentPage === 1}
        onClick={handlePrevious}
        variant="ghost"
        size="icon"
        aria-label="Go to previous page"
      >
        <ChevronLeft {...iconProps} />
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          size="icon"
          className={cn("text-xs")}
          variant={
            cn(currentPage === index + 1 ? "outline" : "ghost") as ButtonVariant
          }
          onClick={() => handlePageChange(index + 1)}
          aria-current={currentPage === index + 1 ? "page" : undefined}
          aria-label={`Go to page ${index + 1}`}
          data-testid="page"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        variant="ghost"
        size="icon"
        aria-label="Go to next page"
      >
        <ChevronRight {...iconProps} />
      </Button>
    </nav>
  );
};

export default Pagination;
