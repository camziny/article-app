import { gql } from "apollo-server";

const typeDefs = gql`
  type Article {
    id: ID!
    title: String!
    body: String!
    user: User!
    createdAt: String!
  }

  type User {
    name: String!
  }

  type Query {
    getAllArticles: [Article]
    getArticle(id: ID!): Article
  }
`;

export default typeDefs;
