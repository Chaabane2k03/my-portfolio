import { supabase } from './supabaseClient';
import skillsResolvers from './resolvers/skillsResolvers';
import projectResolvers from './resolvers/projectResolvers';
import experienceResolvers from './resolvers/experienceResolvers';
import messageResolvers from './resolvers/messageResolvers';
import blogPostResolvers from './resolvers/blogPostResolvers';
import profileResolvers from './resolvers/profileResolvers';


export const resolvers = {
  Query: {
    ...skillsResolvers.Query,
    ...projectResolvers.Query,
    ...experienceResolvers.Query,
    ...messageResolvers.Query,
    ...blogPostResolvers.Query,
    ...profileResolvers.Query,
  },
  Mutation: {
   ...skillsResolvers.Mutation,
    ...projectResolvers.Mutation,
    ...experienceResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...blogPostResolvers.Mutation,
    ...profileResolvers.Mutation,
  },
};
