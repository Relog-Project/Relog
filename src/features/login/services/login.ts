import { SupabaseClient } from '@supabase/supabase-js';
import { loginQueryBuilder } from '../query-builder/login.builder';

export const login = async (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
) => {
  const { data, error } = await loginQueryBuilder(
    supabaseClient,
    email,
    password,
  );

  if (error) {
    throw new Error(`로그인에 실패했습니다: ${error.message}`);
  }

  return data;
};
