import "dotenv/config";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${NEWS_API_KEY}`;

interface Article {
  id: string;
  title: string;
  body: string;
  user: {
    name: string;
  };
  createdAt: string;
}

interface NewsApiResponse {
  status: string;
  articles: Array<{
    author: string | null;
    title: string;
    description: string;
    publishedAt: string;
  }>;
}

const resolvers = {
  Query: {
    getAllArticles: async (): Promise<Article[]> => {
      try {
        const res = await fetch(NEWS_API_URL);
        const jsonResponse: NewsApiResponse = await res.json();

        if (jsonResponse.status !== "ok") {
          throw new Error("Failed to fetch data from NewsAPI");
        }

        return jsonResponse.articles.map((article, index) => ({
          id: index.toString(),
          title: article.title,
          body: article.description,
          user: { name: article.author || "Unknown" },
          createdAt: new Date(article.publishedAt).toISOString(),
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data");
      }
    },
    getArticle: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<Article> => {
      try {
        const res = await fetch(NEWS_API_URL);
        const jsonResponse: NewsApiResponse = await res.json();

        if (jsonResponse.status !== "ok") {
          throw new Error("Failed to fetch data from NewsAPI");
        }

        const articleData = jsonResponse.articles[parseInt(id, 10)];
        if (!articleData) {
          throw new Error(`Article with id ${id} not found`);
        }

        return {
          id,
          title: articleData.title,
          body: articleData.description,
          user: { name: articleData.author || "Unknown" },
          createdAt: new Date(articleData.publishedAt).toISOString(),
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data");
      }
    },
  },
};

export default resolvers;
