'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { addContactAction } from '../actions/add-contact';

interface AddContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddContactModal({
  open,
  onOpenChange,
}: AddContactModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      title: formData.get('title') as string,
      notes: formData.get('notes') as string,
    };

    startTransition(async () => {
      const result = await addContactAction(data);
      if (result.error) {
        setError(result.error);
      } else {
        onOpenChange(false);
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>연락처 추가</DialogTitle>
          <DialogDescription>
            새로운 비즈니스 연락처를 등록합니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" name="name" placeholder="홍길동" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" name="phone" placeholder="010-0000-0000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">회사</Label>
              <Input id="company" name="company" placeholder="회사명" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">직함</Label>
            <Input id="title" name="title" placeholder="팀장 / 대표" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">메모</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="관계에 대한 메모를 입력하세요..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '저장 중...' : '연락처 저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
