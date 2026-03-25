'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/src/components/ui/button';
import { IContact } from '@/src/types/contacts';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';
import { deleteContactAction } from '@/src/features/contacts/actions/delete-contact';

interface IContactDetailHeaderProps {
  contact: IContact;
  setShowModal: (value: boolean) => void;
  onEdit: () => void;
}

export default function ContactDetailHeader({
  contact,
  setShowModal,
  onEdit,
}: IContactDetailHeaderProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteContactAction(contact.id);
      if (result?.error) {
        setDeleteError(result.error);
        setShowDeleteDialog(false);
      }
    });
  };

  return (
    <div className="border-b border-border px-4 py-4 md:px-8 md:py-6">
      <Link
        href="/contacts"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground md:text-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
        Contacts
      </Link>
      {deleteError && (
        <p className="mt-2 text-sm text-destructive">{deleteError}</p>
      )}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground md:h-14 md:w-14 md:text-lg">
            {contact.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold text-foreground md:text-2xl">
              {contact.name}
            </h1>
            <p className="mt-0.5 truncate text-xs text-muted-foreground md:text-sm">
              {contact.title}{contact.title && contact.company && ' · '}{contact.company}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onEdit} className="flex-1 sm:flex-none">
            <Pencil className="mr-2 h-4 w-4" />
            수정
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDeleteDialog(true)}
            className="flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground sm:flex-none"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </Button>
          <Button size="sm" onClick={() => setShowModal(true)} className="flex-1 sm:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            작업 추가
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>연락처를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              {contact.name} 연락처와 관련된 모든 작업 이력이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? '삭제 중...' : '삭제'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
