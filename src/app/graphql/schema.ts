import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Profile {
    id: ID!
    username: String!
    avatar_url: String
    is_admin: Boolean!
    updated_at: String!
  }

  type Query {
    profiles: [Profile!]!
  }
`;