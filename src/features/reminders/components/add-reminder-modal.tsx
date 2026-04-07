'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { createReminderAction } from '../actions/create-reminder';

interface AddReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactId: string;
  contactName: string;
  onCreated: (reminder: any) => void;
}

export function AddReminderModal({
  open,
  onOpenChange,
  contactId,
  contactName,
  onCreated,
}: AddReminderModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [remindDate, setRemindDate] = useState('');
  const [remindTime, setRemindTime] = useState('09:00');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title || !remindDate) return;

    const remindAt = new Date(`${remindDate}T${remindTime}:00`).toISOString();

    startTransition(async () => {
      const result = await createReminderAction({
        contactId,
        contactName,
        title,
        remindAt,
      });

      if (result.error) {
        setError(result.error);
      } else {
        onCreated({ id: crypto.randomUUID(), title, remind_at: remindAt, is_sent: false });
        setTitle('');
        setRemindDate('');
        setRemindTime('09:00');
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>리마인더 추가</DialogTitle>
          <DialogDescription>{contactName}에 대한 팔로업 알림을 설정합니다.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="reminder-title">알림 내용</Label>
            <Input
              id="reminder-title"
              placeholder="예: 계약 관련 팔로업 연락"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="remind-date">날짜</Label>
              <Input
                id="remind-date"
                type="date"
                value={remindDate}
                onChange={(e) => setRemindDate(e.target.value)}
                min={today}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remind-time">시간</Label>
              <Input
                id="remind-time"
                type="time"
                value={remindTime}
                onChange={(e) => setRemindTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '저장 중...' : '리마인더 저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
