'use client';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import React, { useState, useTransition } from 'react';
import { addWorkAction } from '../../works/actions/add-work';

export function AddWorkModal({
  open,
  onClose,
  contactId,
}: {
  open: boolean;
  onClose: () => void;
  contactId?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await addWorkAction({
        title,
        startDate: startDate,
        endDate: isCompleted ? (endDate || new Date().toISOString().split('T')[0]) : null,
        description,
        contactId: contactId,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setTitle('');
        setStartDate('');
        setIsCompleted(false);
        setEndDate('');
        setDescription('');
        onClose();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>작업 추가</DialogTitle>
          <DialogDescription>
            새로운 작업을 기록하세요. 모든 필드를 입력한 후 저장을 누르세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="work-title">작업명</Label>
            <Input
              id="work-title"
              placeholder="예: 웹사이트 리뉴얼"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start-date">시작일</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <span className="text-sm font-medium">진행 상태</span>
            <button
              type="button"
              onClick={() => setIsCompleted((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors
                data-[completed=true]:border-muted data-[completed=true]:bg-muted data-[completed=true]:text-muted-foreground
                data-[completed=false]:border-primary/30 data-[completed=false]:bg-primary/10 data-[completed=false]:text-primary"
              data-completed={isCompleted}
            >
              {isCompleted ? '완료' : '진행 중'}
            </button>
          </div>
          {isCompleted && (
            <div className="grid gap-2">
              <Label htmlFor="end-date">종료일</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="work-description">설명</Label>
            <Textarea
              id="work-description"
              placeholder="작업에 대한 설명을 입력하세요..."
              className="min-h-25"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '저장 중...' : '작업 저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
