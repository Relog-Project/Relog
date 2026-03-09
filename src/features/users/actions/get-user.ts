'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getUserByEmail } from '../services/get-user-by-email';

/**
 * 현재 로그인된 유저 정보를 DB(users 테이블)에서 직접 가져오는 액션
 * 서버 전용 관리자 키를 사용하여 RLS를 우회합니다.
 */
export async function getCurrentUserAction() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return { error: '로그인 세션(이메일)이 없습니다.' };
  }

  // 서버 사이드에서 RLS를 우회하기 위해 service_role 클라이언트 생성
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  try {
    console.log('getCurrentUserAction - Fetching user by email:', email);

    // 주의: getUserById가 아니라 getUserByEmail을 사용해야 합니다.
    const user = await getUserByEmail(supabaseAdmin, email);

    if (!user) {
      console.log(
        'getCurrentUserAction - User not found in table for email:',
        email,
      );
      return { error: '해당 유저 정보를 테이블에서 찾을 수 없습니다.' };
    }

    console.log('getCurrentUserAction - Success:', user.id);
    return { data: user };
  } catch (error) {
    console.error('getCurrentUserAction error:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : '알 수 없는 에러가 발생했습니다.',
    };
  }
}
