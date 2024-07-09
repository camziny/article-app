import React from "react";
import { getAllArticles } from "@/app/lib/fetchData";
import SearchAndSortArticles from "./SearchAndSortArticle";
import Image from "next/image";
import techNews from "../data/images/techNews.png";

interface ArticleListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ArticleList: React.FC<ArticleListProps> = async ({ searchParams }) => {
  let initialData;
  try {
    initialData = await getAllArticles();
  } catch (error) {
    console.error("Failed to fetch initial articles:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Failed to fetch articles
        </h1>
        <p className="text-gray-600">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
      </div>
    );
  }

  if (!initialData || !initialData.data) {
    console.error("Invalid data structure:", initialData);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Failed to fetch articles
        </h1>
        <p className="text-gray-600">Invalid data structure from API</p>
      </div>
    );
  }

  const articles = initialData.data;

  return (
    <div className="container mx-auto p-4 md:px-8" data-test-id="article-list">
      <div className="flex justify-center mb-8">
        <Image src={techNews} alt="tech news logo" width={350} height={350} />
      </div>
      <SearchAndSortArticles articles={articles} searchParams={searchParams} />
    </div>
  );
};

export default ArticleList;
