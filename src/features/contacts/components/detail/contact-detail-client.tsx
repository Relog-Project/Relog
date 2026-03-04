'use client';

import { useState } from 'react';
import ContactDetailHeader from '@/src/features/contacts/components/detail/contact-detail-header';
import ContactDetailInfo from '@/src/features/contacts/components/detail/contact-detail-info';
import ContactWorkHistory from '@/src/features/contacts/components/detail/contact-work-history';
import { AddWorkModal } from '@/src/features/dashboard/components/add-work-modal';

export default function ContactDetailClient({
  contact,
  initialWorks,
}: {
  contact: any;
  initialWorks: any[];
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <ContactDetailHeader contact={contact} setShowModal={setShowModal} />
      <div className="grid gap-8 p-8 lg:grid-cols-3">
        <ContactDetailInfo contact={contact} />
        <ContactWorkHistory contactWorks={initialWorks} />
      </div>
      <AddWorkModal
        open={showModal}
        onClose={() => setShowModal(false)}
        contactId={contact.id}
      />
    </div>
  );
}
