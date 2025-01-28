import { supabase } from './supabaseClient';

export const resolvers = {
  Query: {
    profiles: async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  },
};