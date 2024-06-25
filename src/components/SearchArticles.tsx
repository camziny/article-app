"use client";

import React, { useState, useEffect } from "react";

interface SearchArticlesProps {
  onSearch: (query: string) => void;
}

const SearchArticles: React.FC<SearchArticlesProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles by title..."
        className="w-full p-2 border rounded mb-2"
      />
    </div>
  );
};

export default SearchArticles;
