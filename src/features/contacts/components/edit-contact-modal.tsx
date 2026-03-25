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
import { updateContactAction } from '../actions/update-contact';

interface EditContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    title?: string;
    notes?: string;
  };
}

export default function EditContactModal({
  open,
  onOpenChange,
  contact,
}: EditContactModalProps) {
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
      const result = await updateContactAction(contact.id, data);
      if (result.error) {
        setError(result.error);
      } else {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-50 lg:max-w-120">
        <DialogHeader>
          <DialogTitle>연락처 수정</DialogTitle>
          <DialogDescription>연락처 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">이름</Label>
              <Input id="edit-name" name="name" defaultValue={contact.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">이메일</Label>
              <Input id="edit-email" name="email" type="email" defaultValue={contact.email} required />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">전화번호</Label>
              <Input id="edit-phone" name="phone" defaultValue={contact.phone ?? ''} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-company">회사</Label>
              <Input id="edit-company" name="company" defaultValue={contact.company ?? ''} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-title">직함</Label>
            <Input id="edit-title" name="title" defaultValue={contact.title ?? ''} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-notes">메모</Label>
            <Textarea
              id="edit-notes"
              name="notes"
              defaultValue={contact.notes ?? ''}
              className="min-h-25"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '저장 중...' : '수정 저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
