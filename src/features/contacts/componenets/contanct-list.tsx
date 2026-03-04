import { contacts } from '@/src/mocks/contacts';
import Link from 'next/link';

export default function ContactList() {
  return (
    <div className="p-8">
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
                  최근 컨택
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  이메일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contacts.map((contact) => (
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
                    {contact.company}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {contact.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {contact.lastContactDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {contact.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
