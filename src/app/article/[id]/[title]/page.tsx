import React from "react";
import FullPageArticleView from "@/components/FullPageArticleView";
import { getAllArticles } from "@/app/lib/fetchData";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string; title: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = Number(params.id);
  const articles = await getAllArticles();
  const article = articles.data.find((article) => Number(article.id) === id);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article could not be found",
    };
  }

  return {
    title: article.title,
    description: article.body.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.body.substring(0, 160),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const idAsNumber = Number(params.id);
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

  return (
    <FullPageArticleView
      id={idAsNumber}
      createdAt={article.createdAt}
      url={article.url}
      description={article.description}
    />
  );
}
