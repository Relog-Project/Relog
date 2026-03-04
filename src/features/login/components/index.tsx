'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { LoginAction } from '../actions/login';

export default function Login() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await LoginAction(formData);
      if (result?.error) {
        setMessage(result.error);
      }
    });
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
        <form action={handleSubmit} className="flex flex-col gap-5">
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
          <Button type="submit" className="mt-1 w-full" disabled={isPending}>
            {isPending ? '로그인 중...' : '로그인'}
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
