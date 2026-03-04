import { Button } from '@/src/components/ui/button';
import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import { Plus } from 'lucide-react';
import ContactList from '@/src/features/contacts/componenets/contanct-list';

export default function ContactsPage() {
  return (
    <div>
      <DashboardHeader
        title="Contacts"
        description="관계를 기록하고 관리하세요."
      >
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          연락처 추가
        </Button>
      </DashboardHeader>
      <ContactList />
    </div>
  );
}
