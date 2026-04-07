'use client';

import { useState, useTransition } from 'react';
import { Bell, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { AddReminderModal } from './add-reminder-modal';
import { deleteReminderAction } from '../actions/delete-reminder';

interface Reminder {
  id: string;
  title: string;
  remind_at: string;
  is_sent: boolean;
}

interface ReminderSectionProps {
  contactId: string;
  contactName: string;
  initialReminders: Reminder[];
}

export function ReminderSection({
  contactId,
  contactName,
  initialReminders,
}: ReminderSectionProps) {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCreated = (reminder: Reminder) => {
    setReminders((prev) => [...prev, reminder].sort(
      (a, b) => new Date(a.remind_at).getTime() - new Date(b.remind_at).getTime()
    ));
  };

  const handleDelete = (reminderId: string) => {
    startTransition(async () => {
      const result = await deleteReminderAction(reminderId, contactId);
      if (!result.error) {
        setReminders((prev) => prev.filter((r) => r.id !== reminderId));
      }
    });
  };

  const now = new Date();

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-semibold text-card-foreground">리마인더</h2>
          {reminders.length > 0 && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {reminders.length}
            </span>
          )}
        </div>
        <Button size="sm" variant="outline" onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          추가
        </Button>
      </div>

      {reminders.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          등록된 리마인더가 없습니다.
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {reminders.map((reminder) => {
            const remindDate = new Date(reminder.remind_at);
            const isPast = remindDate < now;
            return (
              <li key={reminder.id} className="flex items-start justify-between gap-4 px-6 py-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg
                    ${reminder.is_sent ? 'bg-muted' : isPast ? 'bg-rose-500/10' : 'bg-primary/10'}`}>
                    {reminder.is_sent
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                      : <Bell className={`h-3.5 w-3.5 ${isPast ? 'text-rose-500' : 'text-primary'}`} />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${reminder.is_sent ? 'text-muted-foreground line-through' : 'text-card-foreground'}`}>
                      {reminder.title}
                    </p>
                    <p className={`mt-0.5 text-xs ${isPast && !reminder.is_sent ? 'text-rose-500 font-medium' : 'text-muted-foreground'}`}>
                      {remindDate.toLocaleDateString('ko-KR', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                      {isPast && !reminder.is_sent && ' · 지남'}
                      {reminder.is_sent && ' · 발송됨'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  disabled={isPending}
                  className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <AddReminderModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        contactId={contactId}
        contactName={contactName}
        onCreated={handleCreated}
      />
    </div>
  );
}
