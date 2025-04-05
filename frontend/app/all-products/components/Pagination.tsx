"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) endPage = Math.min(totalPages - 1, 4);

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) startPage = Math.max(2, totalPages - 3);

      // Add ellipsis after first page if needed
      if (startPage > 2) pageNumbers.push('...');

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) pageNumbers.push('...');

      // Always include last page
      if (totalPages > 1) pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <Button key={index} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => onPageChange(page)} aria-current={currentPage === page ? "page" : undefined} aria-label={`Page ${page}`}>
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      ))}

      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
});
