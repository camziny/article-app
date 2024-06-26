"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const getVisiblePages = (
    totalPages: number,
    currentPage: number,
    visiblePageCount: number
  ) => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(visiblePageCount / 2)
    );
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const smallScreenPages = getVisiblePages(totalPages, currentPage, 5);
  const largeScreenPages = getVisiblePages(totalPages, currentPage, 10);

  return (
    <nav
      aria-label="Pagination controls"
      className="mt-8 flex justify-center px-4"
    >
      <div className="flex flex-wrap justify-center items-center space-x-2">
        <div className="flex items-center">
          <div className="m-1">
            <button
              aria-label="Previous"
              data-test-id="pagination-previous"
              className="p-2"
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevPage) handlePageChange(currentPage - 1);
              }}
              disabled={!hasPrevPage}
            >
              Previous
            </button>
          </div>
          {smallScreenPages.map((page) => (
            <div key={page} className="m-1 sm:hidden">
              <button
                aria-label={`Page ${page}`}
                data-test-id={`pagination-page-${page}`}
                className={`p-2 ${page === currentPage ? "bg-gray-200" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </button>
            </div>
          ))}
          {largeScreenPages.map((page) => (
            <div key={page} className="m-1 hidden sm:inline-block">
              <button
                aria-label={`Page ${page}`}
                data-test-id={`pagination-page-${page}`}
                className={`p-2 ${page === currentPage ? "bg-gray-200" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </button>
            </div>
          ))}
          <div className="m-1">
            <button
              aria-label="Next"
              data-test-id="pagination-next"
              className="p-2"
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage) handlePageChange(currentPage + 1);
              }}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PaginationControls;
