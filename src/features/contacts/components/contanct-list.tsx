import { createClient } from '@/src/utils/supabase/server';
import { getContacts } from '../services/get-contacts';
import Link from 'next/link';
import { Mail, Briefcase } from 'lucide-react';

export default async function ContactList() {
  const supabase = await createClient();
  const contacts = await getContacts(supabase);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                이름
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                회사
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                직함
              </th>
              <th className="px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                이메일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contacts?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-muted-foreground">
                  등록된 연락처가 없습니다.
                </td>
              </tr>
            ) : (
              contacts?.map((contact) => (
                <tr
                  key={contact.id}
                  className="transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/contacts/${contact.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                        {contact.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-foreground hover:text-primary">
                        {contact.name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {contact.company || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {contact.title || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {contact.email}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {contacts?.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">
            등록된 연락처가 없습니다.
          </div>
        ) : (
          contacts?.map((contact) => (
            <Link
              key={contact.id}
              href={`/contacts/${contact.id}`}
              className="block p-4 active:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                  {contact.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {contact.name}
                    </h3>
                  </div>
                  <div className="mt-1 flex flex-col gap-1">
                    {(contact.company || contact.title) && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        <span className="truncate">
                          {contact.company}{contact.company && contact.title && ' · '}{contact.title}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
