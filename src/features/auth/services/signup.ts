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
    if (error.message === 'User already registered') {
      throw new Error('이미 가입된 이메일입니다. 로그인을 이용해주세요.');
    }
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }

  return data;
};
