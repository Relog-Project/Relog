import { SupabaseClient } from "@supabase/supabase-js";
import { getUserByEmailQueryBuilder } from "../query-builder/get-user-by-email.builder";

export const getUserByEmail = async (
  supabaseClient: SupabaseClient,
  email: string,
) => {
  const { data, error } = await getUserByEmailQueryBuilder(supabaseClient, email);

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`이메일로 유저 정보를 불러오는 데 실패했습니다: ${error.message}`);
  }

  return data;
};
