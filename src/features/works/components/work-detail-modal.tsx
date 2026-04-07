'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { IWork } from '@/src/types/works';
import { Calendar, FileText, Info, WalletCards } from 'lucide-react';
import { WorkStatusToggle } from './work-status-toggle';
import { SettlementToggle } from './settlement-toggle';

interface WorkDetailModalProps {
  work: IWork | null;
  open: boolean;
  onClose: () => void;
  onStatusChange?: (workId: string | number, isCompleted: boolean) => void;
}

export function WorkDetailModal({
  work,
  open,
  onClose,
  onStatusChange,
}: WorkDetailModalProps) {
  if (!work) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-full bg-primary/10 p-1.5 text-primary">
              <Info size={16} />
            </div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Work Detail
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">{work.title}</DialogTitle>
          <DialogDescription>
            작업의 상세 내용과 일정을 확인합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          {/* 현재 상태 정보 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">진행 상태</span>
            <WorkStatusToggle
              workId={work.id}
              isCompleted={!!work.endDate}
              contactId={work.contactId}
              // onSuccess={onClose}
              onStatusChange={onStatusChange}
            />
          </div>

          {/* 정산 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WalletCards size={16} className="text-muted-foreground" />
              <span className="text-sm font-semibold">
                {work.amount != null
                  ? `${work.amount.toLocaleString()}원`
                  : '금액 미등록'}
              </span>
            </div>
            <SettlementToggle
              workId={work.id}
              isPaid={work.is_paid}
              contactId={work.contactId}
              // onSuccess={onClose}
            />
          </div>

          {/* 기간 정보 */}
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <Calendar size={18} />
            </div>
            <div className="grid gap-1">
              <span className="text-sm font-semibold">진행 기간</span>
              <p className="text-sm text-muted-foreground">
                {work.startDate} ~ {work.endDate || '진행 중'}
              </p>
            </div>
          </div>

          {/* 상세 설명 */}
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <FileText size={18} />
            </div>
            <div className="grid gap-1">
              <span className="text-sm font-semibold">작업 상세 설명</span>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {work.description || '등록된 설명이 없습니다.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
