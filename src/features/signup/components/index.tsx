'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { signupAction } from '../actions/signup';

export default function SignUp() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await signupAction(formData);
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
          새 계정을 만들어보세요
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
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="홍길동"
              required
            />
          </div>
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
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <Button type="submit" className="mt-1 w-full" disabled={isPending}>
            {isPending ? '가입 중...' : '무료로 시작하기'}
          </Button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
