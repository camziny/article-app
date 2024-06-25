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
    <div className="mt-8 flex justify-center px-4">
      <Pagination className="flex flex-wrap justify-center items-center space-x-2">
        <PaginationContent className="flex items-center">
          <PaginationItem className="m-1">
            <PaginationPrevious
              href="#"
              className="p-2"
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevPage) handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {smallScreenPages.map((page) => (
            <PaginationItem key={page} className="m-1 sm:hidden">
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {largeScreenPages.map((page) => (
            <PaginationItem key={page} className="m-1 hidden sm:inline-block">
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem className="m-1">
            <PaginationNext
              href="#"
              className="p-2"
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage) handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
