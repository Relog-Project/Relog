import { SupabaseClient } from '@supabase/supabase-js';

export const signupQueryBuilder = (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
  name: string,
) => {
  const query = supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  return query;
};
