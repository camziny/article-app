import { getAllArticles } from "../lib/fetchData";
import Link from "next/link";
import { Article } from "../types/articles";
import FavoritesClient from "@/components/FavoritesClient";

export default async function FavoritesPage() {
  let articles: Article[] = [];
  try {
    const allArticles = await getAllArticles();
    articles = allArticles.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw new Error("Failed to fetch articles");
  }

  return <FavoritesClient articles={articles} />;
}
