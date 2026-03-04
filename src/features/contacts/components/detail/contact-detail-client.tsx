'use client';

import { useState } from 'react';
import ContactDetailHeader from '@/src/features/contacts/components/detail/contact-detail-header';
import ContactDetailInfo from '@/src/features/contacts/components/detail/contact-detail-info';
import ContactWorkHistory from '@/src/features/contacts/components/detail/contact-work-history';
import { IWork } from '@/src/types/works';
import { AddWorkModal } from '@/src/features/dashboard/components/add-work-modal';

export default function ContactDetailClient({
  contact,
  initialWorks,
}: {
  contact: any;
  initialWorks: any[];
}) {
  const [contactWorks, setContactWorks] = useState<any[]>(initialWorks);
  const [showModal, setShowModal] = useState(false);

  function handleAddWork(work: Omit<IWork, 'id' | 'contactId'>) {
    // This part should eventually call a Server Action for DB persistence
    const newWork = {
      ...work,
      id: `w-${Date.now()}`,
      contactId: contact.id,
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
