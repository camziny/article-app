import { getAllArticles } from "@/app/lib/fetchData";
import SearchAndSortArticles from "./SearchAndSortArticle";

export default async function ArticleList() {
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Tech News Aggregator
      </h1>
      <SearchAndSortArticles articles={articles} />
    </div>
  );
}
