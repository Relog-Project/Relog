"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { updateWorkStatusAction } from "../actions/update-work";

interface WorkStatusToggleProps {
  workId: string | number;
  isCompleted: boolean;
  contactId?: string | number;
  onSuccess?: () => void;
  onStatusChange?: (workId: string | number, isCompleted: boolean) => void;
}

export function WorkStatusToggle({
  workId,
  isCompleted,
  contactId,
  onSuccess,
  onStatusChange,
}: WorkStatusToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [optimisticCompleted, setOptimisticCompleted] = useState(isCompleted);

  useEffect(() => {
    if (!isPending) setOptimisticCompleted(isCompleted);
  }, [isCompleted]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    const next = !optimisticCompleted;
    setOptimisticCompleted(next);

    startTransition(async () => {
      const result = await updateWorkStatusAction(workId, next, contactId);
      if (result.error) {
        setOptimisticCompleted(!next);
        setError(result.error);
      } else {
        onStatusChange?.(workId, next);
        router.refresh();
        onSuccess?.();
      }
    });
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50
          data-[completed=true]:border-muted data-[completed=true]:bg-muted data-[completed=true]:text-muted-foreground
          data-[completed=false]:border-primary/30 data-[completed=false]:bg-primary/10 data-[completed=false]:text-primary
          hover:opacity-80"
        data-completed={optimisticCompleted}
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : optimisticCompleted ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <Circle className="h-3.5 w-3.5" />
        )}
        {optimisticCompleted ? "완료" : "진행 중"}
      </button>
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
