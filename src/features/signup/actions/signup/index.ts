'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signup } from '../../services/signup';

export async function signupAction(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

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
