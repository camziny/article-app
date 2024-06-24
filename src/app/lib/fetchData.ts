export async function getArticles(page: number, limit: number) {
  const query = `
    query GetArticles($page: Int, $limit: Int) {
      posts(options: { paginate: { page: $page, limit: $limit } }) {
        data {
          id
          title
          user {
            name
          }
          body
        }
        meta {
          totalCount
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
      body: JSON.stringify({
        query,
        variables: { page, limit },
      }),
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

    return jsonResponse.data.posts;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
