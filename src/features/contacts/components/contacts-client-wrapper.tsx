'use client';

import { useState, cloneElement } from 'react';
import { Button } from '@/src/components/ui/button';
import { Plus } from 'lucide-react';
import AddContactModal from './add-contact-modal';

export default function ContactsClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* cloneElement to inject the button into DashboardHeader if children is a single element */}
      {/* Actually, it's easier to just put the button in the wrapper */}
      <div className="relative">
        {cloneElement(children as React.ReactElement<any>, {
          children: (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              연락처 추가
            </Button>
          ),
        })}
      </div>

      <AddContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
