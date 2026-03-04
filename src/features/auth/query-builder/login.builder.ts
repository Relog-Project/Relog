import { SupabaseClient } from '@supabase/supabase-js';

export const loginQueryBuilder = (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
  rememberMe: boolean = false,
) => {
  const query = supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  return query;
};
