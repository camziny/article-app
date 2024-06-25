"use client";

import React, { useState, useEffect } from "react";
import { Article } from "@/app/types/articles";
import SearchArticles from "./SearchArticles";
import PaginationControls from "./PaginationControls";
import DropdownMenu from "./DropDownMenu";

interface SearchAndSortArticlesProps {
  articles: Article[];
}

const SearchAndSortArticles: React.FC<SearchAndSortArticlesProps> = ({
  articles,
}) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [sortKey, setSortKey] = useState<"date" | "author" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    let updatedArticles = articles;

    // Filter articles by search query
    if (searchQuery) {
      updatedArticles = updatedArticles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort articles
    if (sortKey) {
      updatedArticles = updatedArticles.sort((a, b) => {
        if (sortKey === "date") {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          if (sortOrder === "asc") {
            return dateA > dateB ? 1 : -1;
          } else {
            return dateA < dateB ? 1 : -1;
          }
        } else if (sortKey === "author") {
          if (sortOrder === "asc") {
            return a.user.name.localeCompare(b.user.name);
          } else {
            return b.user.name.localeCompare(a.user.name);
          }
        }
        return 0;
      });
    }

    setFilteredArticles(updatedArticles);
  }, [sortKey, sortOrder, searchQuery, articles]);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (key: "date" | "author", order: "asc" | "desc") => {
    setSortKey(key);
    setSortOrder(order);
  };

  return (
    <div>
      <SearchArticles onSearch={setSearchQuery} />
      <div className="flex justify-between mb-2">
        <DropdownMenu onSortChange={handleSortChange} />
      </div>
      <ul className="space-y-6 mt-4">
        {paginatedArticles.map((article) => (
          <li
            key={article.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {article.title}
            </h2>
            <p className="text-gray-600">By {article.user.name}</p>
            <p className="text-gray-600">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mt-4">{article.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <PaginationControls
          hasNextPage={currentPage < totalPages}
          hasPrevPage={currentPage > 1}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchAndSortArticles;
