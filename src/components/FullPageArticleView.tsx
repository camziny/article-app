import { getArticle } from "@/app/lib/fetchData";
import { Article } from "@/app/types/articles";

export default async function FullPageArticleView(props: {
  id: number;
  createdAt: string;
}) {
  const article: Article = await getArticle(props.id);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          {article.title}
        </h1>
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg text-gray-700">By {article.user.name}</p>
          <p className="text-lg text-gray-500">
            {new Date(props.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-lg text-gray-800 leading-relaxed">
            {article.body}
          </p>
        </div>
      </div>
    </div>
  );
}
