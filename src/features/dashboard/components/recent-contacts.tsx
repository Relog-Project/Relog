import { contacts } from '@/src/mocks/contacts';

export default function RecentContacts() {
  const recentContacts = [...contacts]
    .sort(
      (a, b) =>
        new Date(b.lastContactDate).getTime() -
        new Date(a.lastContactDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-base font-semibold text-card-foreground">
          최근 컨택
        </h2>
      </div>
      <div className="divide-y divide-border">
        {recentContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                {contact.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  {contact.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {contact.company}
                </p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {contact.lastContactDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
