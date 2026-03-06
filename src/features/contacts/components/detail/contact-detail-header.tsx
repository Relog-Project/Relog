import { Button } from '@/src/components/ui/button';
import { IContact } from '@/src/types/contacts';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

interface IContactDetailHeaderProps {
  contact: IContact;
  setShowModal: (value: boolean) => void;
}

export default function ContactDetailHeader({
  contact,
  setShowModal,
}: IContactDetailHeaderProps) {
  return (
    <div className="border-b border-border px-4 py-4 md:px-8 md:py-6">
      <Link
        href="/contacts"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground md:text-sm"
      >
        <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
        Contacts
      </Link>
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
        <Button size="sm" onClick={() => setShowModal(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          작업 추가
        </Button>
      </div>
    </div>
  );
}
