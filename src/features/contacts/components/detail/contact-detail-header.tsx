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
    <div className="border-b border-border px-8 py-6">
      <Link
        href="/contacts"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Contacts
      </Link>
      <div className="mt-4 flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            {contact.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {contact.name}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {contact.title} · {contact.company}
            </p>
          </div>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          작업 추가
        </Button>
      </div>
    </div>
  );
}
