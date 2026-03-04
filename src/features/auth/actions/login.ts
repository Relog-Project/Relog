'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { login } from '../services/login';

export async function LoginAction(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') === 'on';

  const supabase = await createClient(rememberMe);

  try {
    await login(supabase, email, password, rememberMe);
  } catch (error) {
    console.error('Login action error:', error);
    return { error: '인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
