'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { updateSettlementAction } from '../actions/update-settlement';

interface SettlementToggleProps {
  workId: string | number;
  isPaid: boolean;
  contactId?: string | number;
  onSuccess?: () => void;
}

export function SettlementToggle({
  workId,
  isPaid,
  contactId,
  onSuccess,
}: SettlementToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticPaid, setOptimisticPaid] = useState(isPaid);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !optimisticPaid;
    setOptimisticPaid(next);

    startTransition(async () => {
      const result = await updateSettlementAction(workId, next, contactId);
      if (result.error) {
        setOptimisticPaid(!next);
      } else {
        router.refresh();
        onSuccess?.();
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50
        data-[paid=true]:border-emerald-200 data-[paid=true]:bg-emerald-50 data-[paid=true]:text-emerald-700
        data-[paid=false]:border-orange-200 data-[paid=false]:bg-orange-50 data-[paid=false]:text-orange-600
        hover:opacity-80 dark:data-[paid=true]:border-emerald-800 dark:data-[paid=true]:bg-emerald-950 dark:data-[paid=true]:text-emerald-400
        dark:data-[paid=false]:border-orange-800 dark:data-[paid=false]:bg-orange-950 dark:data-[paid=false]:text-orange-400"
      data-paid={optimisticPaid}
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : optimisticPaid ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <Circle className="h-3.5 w-3.5" />
      )}
      {optimisticPaid ? '수금 완료' : '미수금'}
    </button>
  );
}
