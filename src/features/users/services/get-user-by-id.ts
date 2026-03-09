import { SupabaseClient } from "@supabase/supabase-js";
import { getUserByIdQueryBuilder } from "../query-builder/get-user-by-id.builder";

export const getUserById = async (
  supabaseClient: SupabaseClient,
  id: string,
) => {
  const { data, error } = await getUserByIdQueryBuilder(supabaseClient, id);

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // 유저를 찾지 못한 경우 null 반환
    }
    throw new Error(`사용자 정보를 불러오는 데 실패했습니다: ${error.message}`);
  }

  return data;
};
