import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles {
    posts {
      data {
        id
        title
        user {
          name
        }
        createdAt
      }
    }
  }
`;
