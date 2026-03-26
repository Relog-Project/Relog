'use server';

import { createClient } from '@/src/utils/supabase/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signup } from '../services/signup';

export async function signupAction(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  // 소셜 로그인으로 이미 가입된 이메일인지 확인
  const supabaseAdmin = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    const identities = existingUser.identities ?? [];
    const socialProviders = identities.filter(i => i.provider !== 'email').map(i => i.provider);
    if (socialProviders.length > 0) {
      const providerLabel: Record<string, string> = { google: 'Google', apple: 'Apple', naver: '네이버' };
      const names = socialProviders.map(p => providerLabel[p] ?? p).join(', ');
      return { error: `이미 ${names} 소셜 로그인으로 가입된 이메일입니다. 소셜 로그인을 이용해주세요.` };
    }
    // 이메일/비밀번호로 이미 가입된 경우 Supabase signUp이 자체적으로 처리
  }

  try {
    await signup(supabase, email, password, name);
  } catch (error) {
    console.error('Signup action error:', error);

    if (error instanceof Error && error.message === 'EMAIL_RATE_LIMIT') {
      return {
        error:
          "이메일 발송 제한(시간당 약 3회)을 초과했습니다. 1시간 뒤 다시 시도하거나, Supabase 대시보드에서 'Confirm email' 옵션을 꺼주세요.",
      };
    }

    return {
      error:
        error instanceof Error ? error.message : '회원가입에 실패했습니다.',
    };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
