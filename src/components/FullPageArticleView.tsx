import { getArticle } from "@/app/lib/fetchData";
import { Article } from "@/app/types/articles";
import Head from "next/head";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

export default async function FullPageArticleView(props: {
  id: number;
  createdAt: string;
  url: string;
  description: string;
}) {
  const article: Article = await getArticle(props.id);

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
      </Head>
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
          <div className="mt-6">
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Read Full Article
            </Link>
          </div>
          <div className="flex items-center mt-6">
            <p className="text-lg mr-2">Mark as favorite:</p>
            <FavoriteButton
              articleId={article.id}
              articleTitle={article.title}
              index={0}
            />
          </div>
        </div>
      </div>
    </>
  );
}
