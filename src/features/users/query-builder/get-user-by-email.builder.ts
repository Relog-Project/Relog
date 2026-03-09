import { SupabaseClient } from "@supabase/supabase-js";

export const getUserByEmailQueryBuilder = (
  supabaseClient: SupabaseClient,
  email: string,
) => {
  return supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
};
