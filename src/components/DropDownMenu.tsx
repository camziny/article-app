"use client";
import React, { useState } from "react";

const DropdownMenu: React.FC<{
  onSortChange: (key: "date" | "author", order: "asc" | "desc") => void;
}> = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = (key: "date" | "author") => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    onSortChange(key, order);
    setIsOpen(false);
  };

  const getSortLabel = (key: "date" | "author", order: "asc" | "desc") => {
    if (key === "date") {
      return `Sort by Date (${order === "asc" ? "Ascending" : "Descending"})`;
    } else {
      return `Sort by Author (${order === "asc" ? "A to Z" : "Z to A"})`;
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleDropdown}
          data-test-id="sort-dropdown-button"
        >
          Sort by
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.939l3.71-3.729a.75.75 0 111.06 1.061l-4 4.02a.75.75 0 01-1.06 0l-4-4.02a.75.75 0 010-1.061z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          data-test-id="sort-dropdown-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => handleSortChange("date")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              data-test-id="sort-date-button"
            >
              {getSortLabel("date", sortOrder)}
            </button>
            <button
              onClick={() => handleSortChange("author")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              data-test-id="sort-author-button"
            >
              {getSortLabel("author", sortOrder)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
