'use client';

import ContactDetailHeader from '@/src/features/contacts/componenets/detail/contact-detail-header';
import ContactDetailInfo from '@/src/features/contacts/componenets/detail/contact-detail-info';
import ContactWorkHistory from '@/src/features/contacts/componenets/detail/contact-work-history';
import { AddWorkModal } from '@/src/features/dashboard/components/add-work-modal';
import { contacts } from '@/src/mocks/contacts';
import { works } from '@/src/mocks/works';
import { IWork } from '@/src/types/works';
import { use, useState } from 'react';

export default function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const contact = contacts.find((c) => c.id === id);
  const [contactWorks, setContactWorks] = useState<IWork[]>(
    works.filter((w) => w.contactId === id),
  );
  const [showModal, setShowModal] = useState(false);

  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">연락처를 찾을 수 없습니다.</p>
      </div>
    );
  }

  function handleAddWork(work: Omit<IWork, 'id' | 'contactId'>) {
    const newWork: IWork = {
      ...work,
      id: `w-${Date.now()}`,
      contactId: id,
    };
    setContactWorks((prev) => [newWork, ...prev]);
  }

  return (
    <div>
      <ContactDetailHeader contact={contact} setShowModal={setShowModal} />
      <div className="grid gap-8 p-8 lg:grid-cols-3">
        <ContactDetailInfo contact={contact} />
        <ContactWorkHistory contactWorks={contactWorks} />
      </div>
      <AddWorkModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddWork}
      />
    </div>
  );
}
