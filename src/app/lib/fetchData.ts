import { Article } from "../types/articles";

export async function getAllArticles() {
  const query = `
    query GetAllArticles {
      posts {
        data {
          id
          title
          user {
            name
          }
          body
        }
      }
    }
  `;

  try {
    const res = await fetch("https://graphqlzero.almansi.me/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

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

    if (jsonResponse.errors) {
      console.error("GraphQL errors:", jsonResponse.errors);
      throw new Error("GraphQL errors");
    }

    const articlesWithDate: Article[] = jsonResponse.data.posts.data.map(
      (article: Article, index: number) => {
        const creationDate = new Date();
        creationDate.setDate(creationDate.getDate() - index);
        return { ...article, createdAt: creationDate.toISOString() };
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
