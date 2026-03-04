import { createClient } from '@/src/utils/supabase/server';
import { getContacts } from '../services/get-contacts';
import Link from 'next/link';

export default async function ContactList() {
  const supabase = await createClient();
  const contacts = await getContacts(supabase);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                이름
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                회사
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                직함
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
    </div>
  );
}
