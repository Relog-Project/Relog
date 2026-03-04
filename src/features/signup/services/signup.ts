import { SupabaseClient } from '@supabase/supabase-js';
import { signupQueryBuilder } from '../query-builder/signup.builder';

export const signup = async (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
  name: string,
) => {
  const { data, error } = await signupQueryBuilder(
    supabaseClient,
    email,
    password,
    name,
  );

  if (error) {
    if (error.status === 429) {
      throw new Error('EMAIL_RATE_LIMIT');
    }
    throw new Error(`회원가입에 실패했습니다: ${error.message}`);
  }

  return data;
};
