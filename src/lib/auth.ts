import { supabase } from '../app/graphql/supabaseClient';

export async function signUpAdmin(email: string, password: string, username: string) {
  // Step 1: Sign up the user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // Step 2: Insert the user profile into the `profiles` table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user?.id, // Link to the auth user
        username,
        is_admin: true, // Mark as admin
      },
    ]);

  if (profileError) throw profileError;

  return profileData;
}




export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}