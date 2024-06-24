import { getArticles } from "@/app/lib/fetchData";
import PaginationControls from "./PaginationControls";
import { Article } from "@/app/types/articles";

export default async function ArticleList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const limit = searchParams?.limit ? Number(searchParams.limit) : 10;

  let initialData;
  try {
    initialData = await getArticles(page, limit);
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

  const totalCount = initialData.meta.totalCount;
  const totalPages = Math.ceil(totalCount / limit);
  const articles: Article[] = initialData.data;

  return (
    <div className="container mx-auto p-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Articles</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li
            key={article.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {article.title}
            </h2>
            <p className="text-gray-600">By {article.user.name}</p>
            <p className="text-gray-700 mt-4">{article.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <PaginationControls
          hasNextPage={page < totalPages}
          hasPrevPage={page > 1}
          currentPage={page}
          totalPages={totalPages}
          limit={limit}
        />
      </div>
    </div>
  );
}
