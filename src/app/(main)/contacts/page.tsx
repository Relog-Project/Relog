import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import ContactsClientWrapper from '@/src/features/contacts/components/contacts-client-wrapper';
import ContactList from '@/src/features/contacts/components/contanct-list';

export default function ContactsPage() {
  return (
    <div>
      <ContactsClientWrapper>
        <DashboardHeader
          title="Contacts"
          description="관계를 기록하고 관리하세요."
        >
          {/* This button is part of the client wrapper now */}
        </DashboardHeader>
      </ContactsClientWrapper>

      <div className="p-8">
        <ContactList />
      </div>
    </div>
  );
}
