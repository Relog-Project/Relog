'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { resetPasswordAction } from '../actions/reset.password';

export default function ResetPasswordForm() {
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success';
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await resetPasswordAction(formData);
      if (result?.error) {
        setMessage({ text: result.error, type: 'error' });
      } else if (result?.success) {
        setMessage({
          text: '비밀번호 재설정 링크가 이메일로 발송되었습니다. 이메일함을 확인해주세요.',
          type: 'success',
        });
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
        <p className="mt-2 text-sm text-muted-foreground">비밀번호 찾기</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <form action={handleSubmit} className="flex flex-col gap-5">
          {message && (
            <div
              className={`rounded-md p-3 text-sm font-medium text-center break-keep ${message.type === 'error' ? 'bg-destructive/15 text-destructive' : 'bg-primary/15 text-primary'}`}
            >
              {message.text}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">재설정 링크를 받을 이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-1 w-full"
            disabled={isPending || message?.type === 'success'}
          >
            {isPending ? '발송 중...' : '재설정 링크 받기'}
          </Button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        비밀번호가 기억나셨나요?{' '}
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
