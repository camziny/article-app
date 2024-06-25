"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/app/types/articles";

const FavoritesClient = ({ articles }: { articles: Article[] }) => {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favoritedArticles = articles.filter((article) =>
      favoriteIds.includes(article.id)
    );
    setFavorites(favoritedArticles);
  }, [articles]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Favorited Articles</h1>
      <ul className="space-y-4">
        {favorites.length > 0 ? (
          favorites.map((article) => (
            <li
              key={article.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-center">
                <Link
                  href={`/article/${article.id}/${encodeURIComponent(
                    article.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "")
                  )}`}
                >
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {article.title}
                  </h2>
                  <p className="text-gray-600">By {article.user.name}</p>
                  <p className="text-gray-600">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mt-4">{article.body}</p>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p className="text-lg text-gray-700">
            You currently have no favorited articles. To save an article, click
            the star icon next to it.
          </p>
        )}
      </ul>
    </div>
  );
};

export default FavoritesClient;
