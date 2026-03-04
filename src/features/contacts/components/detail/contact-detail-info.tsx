import { IContact } from '@/src/types/contacts';
import { Building2, Mail, Phone } from 'lucide-react';

interface IContactDetailInfoProps {
  contact: IContact;
}

export default function ContactDetailInfo({
  contact,
}: IContactDetailInfoProps) {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          연락처 정보
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{contact.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{contact.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{contact.company}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          관계 메모
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground">
          {contact.notes}
        </p>
      </div>
    </div>
  );
}
