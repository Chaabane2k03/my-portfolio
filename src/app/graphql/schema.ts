import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Profile {
  id: ID!
  username: String!
  avatar_url: String
  is_admin: Boolean!
  updated_at: String!
}

type Project {
  id: ID!
  user_id: ID!
  title: String!
  slug: String!
  description: String
  image_path: String
  tech_stack: [String]
  is_featured: Boolean!
  created_at: String!
}

type Skill {
  id: ID!
  name: String!
  category: String!
  icon: String
}

type Experience {
  id: ID!
  user_id: ID!
  job_title: String!
  company: String!
  start_date: String!
  end_date: String
  description: String
  type: String!
}

type BlogPost {
  id: ID!
  user_id: ID!
  title: String!
  slug: String!
  content: String!
  cover_path: String
  is_published: Boolean!
  published_at: String!
}

type Message {
  id: ID!
  name: String!
  email: String!
  message: String!
  created_at: String!
}

type Query {
  # Profiles
  profiles: [Profile!]!
  profile(id: ID!): Profile

  # Projects
  projects: [Project!]!
  project(id: ID!): Project
  featuredProjects: [Project!]!

  # Skills
  skills: [Skill!]!
  skill(id: ID!): Skill

  # Experiences
  experiences: [Experience!]!
  experience(id: ID!): Experience

  # Blog Posts
  blogPosts: [BlogPost!]!
  blogPost(id: ID!): BlogPost
  publishedBlogPosts: [BlogPost!]!

  # Messages
  messages: [Message!]!
  message(id: ID!): Message
}

type Mutation {
  # Profiles
  createProfile(username: String!, avatar_url: String, is_admin: Boolean!): Profile!
  updateProfile(id: ID!, username: String, avatar_url: String, is_admin: Boolean): Profile!
  deleteProfile(id: ID!): Boolean!

  # Projects
  createProject(
    user_id: ID!
    title: String!
    slug: String!
    description: String
    image_path: String
    tech_stack: [String]
    is_featured: Boolean!
  ): Project!
  updateProject(
    id: ID!
    title: String
    slug: String
    description: String
    image_path: String
    tech_stack: [String]
    is_featured: Boolean
  ): Project!
  deleteProject(id: ID!): Boolean!

  # Skills
  createSkill(name: String!, category: String!, icon: String): Skill!
  updateSkill(id: ID!, name: String, category: String, icon: String): Skill!
  deleteSkill(id: ID!): Boolean!

  # Experiences
  createExperience(
    user_id: ID!
    job_title: String!
    company: String!
    start_date: String!
    end_date: String
    description: String
    type: String!
  ): Experience!
  updateExperience(
    id: ID!
    job_title: String
    company: String
    start_date: String
    end_date: String
    description: String
    type: String
  ): Experience!
  deleteExperience(id: ID!): Boolean!

  # Blog Posts
  createBlogPost(
    user_id: ID!
    title: String!
    slug: String!
    content: String!
    cover_path: String
    is_published: Boolean!
  ): BlogPost!
  updateBlogPost(
    id: ID!
    title: String
    slug: String
    content: String
    cover_path: String
    is_published: Boolean
  ): BlogPost!
  deleteBlogPost(id: ID!): Boolean!

  # Messages
  createMessage(name: String!, email: String!, message: String!): Message!
  deleteMessage(id: ID!): Boolean!
}
`;