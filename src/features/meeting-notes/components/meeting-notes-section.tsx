'use client';

import { useState, useTransition } from 'react';
import { FileText, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { createMeetingNoteAction } from '../actions/create-meeting-note';
import { deleteMeetingNoteAction } from '../actions/delete-meeting-note';

interface MeetingNote {
  id: string;
  content: string;
  met_at: string;
  created_at: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}년 ${m}월 ${day}일`;
}

export function MeetingNotesSection({
  contactId,
  initialNotes,
}: {
  contactId: string;
  initialNotes: MeetingNote[];
}) {
  const [notes, setNotes] = useState<MeetingNote[]>(initialNotes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [content, setContent] = useState('');
  const [metAt, setMetAt] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!content || !metAt) return;

    startTransition(async () => {
      const result = await createMeetingNoteAction({
        contactId,
        content,
        metAt: new Date(metAt).toISOString(),
      });

      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setNotes((prev) => [result.data, ...prev]);
        setContent('');
        setMetAt('');
        setIsFormOpen(false);
      }
    });
  };

  const handleDelete = (noteId: string) => {
    startTransition(async () => {
      const result = await deleteMeetingNoteAction(noteId, contactId);
      if (!result.error) {
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
        if (expandedId === noteId) setExpandedId(null);
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-semibold text-card-foreground">회의록</h2>
          {notes.length > 0 && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {notes.length}
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsFormOpen((v) => !v)}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          추가
        </Button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="border-b border-border px-6 py-4 flex flex-col gap-3">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="grid gap-1.5">
            <Label htmlFor="met-at">미팅 날짜</Label>
            <Input
              id="met-at"
              type="date"
              value={metAt}
              onChange={(e) => setMetAt(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="note-content">내용</Label>
            <Textarea
              id="note-content"
              placeholder="미팅 내용, 논의 사항, 다음 액션 등을 기록하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => { setIsFormOpen(false); setError(null); }}
              disabled={isPending}
            >
              취소
            </Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? '저장 중...' : '저장'}
            </Button>
          </div>
        </form>
      )}

      {notes.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          등록된 회의록이 없습니다.
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {notes.map((note) => {
            const isExpanded = expandedId === note.id;
            return (
              <li key={note.id} className="px-6 py-4">
                <div className="flex items-center justify-between gap-2">
                  <button
                    className="flex flex-1 items-center gap-3 text-left"
                    onClick={() => setExpandedId(isExpanded ? null : note.id)}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {formatDate(note.met_at)}
                      </p>
                      {!isExpanded && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {note.content}
                        </p>
                      )}
                    </div>
                    {isExpanded
                      ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                      : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    }
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    disabled={isPending}
                    className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                {isExpanded && (
                  <div className="mt-3 ml-10 rounded-lg bg-muted/50 px-4 py-3 text-sm text-card-foreground whitespace-pre-wrap">
                    {note.content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
