'use client';

import { useState } from 'react';
import ContactDetailHeader from '@/src/features/contacts/components/detail/contact-detail-header';
import ContactDetailInfo from '@/src/features/contacts/components/detail/contact-detail-info';
import ContactWorkHistory from '@/src/features/contacts/components/detail/contact-work-history';
import { AddWorkModal } from '@/src/features/dashboard/components/add-work-modal';
import EditContactModal from '@/src/features/contacts/components/edit-contact-modal';

export default function ContactDetailClient({
  contact,
  initialWorks,
}: {
  contact: any;
  initialWorks: any[];
}) {
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <ContactDetailHeader
        contact={contact}
        setShowModal={setShowAddWorkModal}
        onEdit={() => setShowEditModal(true)}
      />
      <div className="grid gap-6 p-4 md:p-8 lg:grid-cols-3 lg:gap-8">
        <ContactDetailInfo contact={contact} />
        <ContactWorkHistory contactWorks={initialWorks} />
      </div>
      <AddWorkModal
        open={showAddWorkModal}
        onClose={() => setShowAddWorkModal(false)}
        contactId={contact.id}
      />
      <EditContactModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        contact={contact}
      />
    </div>
  );
}
