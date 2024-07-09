import { Article } from "../types/articles";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${NEWS_API_KEY}`;

function cleanContent(content: string): string {
  if (!content) {
    return "Content not available.";
  }

  return content.replace(/\s\[\+\d+\schars\]$/, "");
}

export async function getAllArticles() {
  try {
    const res = await fetch(NEWS_API_URL);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        "Failed to fetch data:",
        res.status,
        res.statusText,
        errorText
      );
      throw new Error("Failed to fetch data");
    }

    const jsonResponse = await res.json();

    if (jsonResponse.status !== "ok") {
      console.error("API errors:", jsonResponse);
      throw new Error("API errors");
    }

    const articlesWithDate: Article[] = jsonResponse.articles.map(
      (article: any, index: number) => {
        return {
          id: index.toString(),
          title: article.title,
          body: article.description,
          user: { name: article.author || "Unknown" },
          createdAt: new Date(article.publishedAt).toISOString(),
        };
      }
    );

    return {
      data: articlesWithDate,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getArticle(id: number): Promise<Article> {
  try {
    const res = await fetch(NEWS_API_URL);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        "Failed to fetch data:",
        res.status,
        res.statusText,
        errorText
      );
      throw new Error("Failed to fetch data");
    }

    const jsonResponse = await res.json();

    if (jsonResponse.status !== "ok") {
      console.error("API errors:", jsonResponse);
      throw new Error("API errors");
    }

    const articleData = jsonResponse.articles[id];
    if (!articleData) {
      throw new Error(`Article with id ${id} not found`);
    }

    const article: Article = {
      id: id.toString(),
      title: articleData.title,
      body: cleanContent(articleData.content),
      description: articleData.description,
      user: { name: articleData.author || "Unknown" },
      createdAt: new Date(articleData.publishedAt).toISOString(),
      url: articleData.url,
    };

    return article;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
