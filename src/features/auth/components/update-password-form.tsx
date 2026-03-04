'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { updatePasswordAction } from '../actions/update.password';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/router';

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success';
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updatePasswordAction(formData);
      if (result?.error) {
        setMessage({ text: result.error, type: 'error' });
      } else if (result?.success) {
        setMessage({
          text: '비밀번호가 성공적으로 변경되었습니다. 대시보드로 이동합니다...',
          type: 'success',
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Relog
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            새로운 비밀번호를 입력해주세요
          </p>
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
              <Label htmlFor="password">새 비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="새로운 비밀번호"
                required
                minLength={6}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 다시 입력"
                required
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="mt-1 w-full"
              disabled={isPending || message?.type === 'success'}
            >
              {isPending ? '변경 중...' : '비밀번호 변경하기'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
