'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const initialMessage =
    errorParam === 'EmailAlreadyRegistered'
      ? '이미 이메일/비밀번호로 가입된 계정입니다. 이메일 로그인을 이용해주세요.'
      : null;

  const [message, setMessage] = useState<string | null>(initialMessage);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setMessage(null);
    startTransition(async () => {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMessage('인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    });
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Relog
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">
          계정에 로그인하세요
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {message && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium text-center break-keep">
              {message}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
              <Link
                href="/reset-password"
                className="text-xs font-medium text-muted-foreground hover:text-primary hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              자동 로그인
            </label>
          </div>
          <Button type="submit" className="mt-1 w-full" disabled={isPending}>
            {isPending ? '로그인 중...' : '로그인'}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                또는 소셜 계정으로 로그인
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('google')}
            disabled={isPending}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google로 로그인
          </Button>

          {/* <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('apple')}
            disabled={isPending}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Apple로 로그인
          </Button> */}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('naver')}
            disabled={isPending}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="#03C75A">
              <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
            </svg>
            네이버로 로그인
          </Button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        계정이 없으신가요?{' '}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
