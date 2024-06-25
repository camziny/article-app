import React from "react";
import FullPageArticleView from "@/components/FullPageArticleView";
import { getAllArticles } from "@/app/lib/fetchData";

export default async function ArticlePage({
  params: { id: articleId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(articleId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid article id");

  let articles;
  try {
    articles = await getAllArticles();
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw new Error("Failed to fetch articles");
  }

  const article = articles.data.find(
    (article) => Number(article.id) === idAsNumber
  );

  if (!article) {
    throw new Error("Article not found");
  }

  return <FullPageArticleView id={idAsNumber} createdAt={article.createdAt} />;
}
