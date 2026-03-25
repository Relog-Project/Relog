'use client';

import { useState, cloneElement } from 'react';
import { Button } from '@/src/components/ui/button';
import { Plus } from 'lucide-react';
import AddContactModal from './add-contact-modal';
import Link from 'next/link';

export default function ContactsClientWrapper({
  children,
  isAtFreeLimit,
}: {
  children: React.ReactNode;
  isAtFreeLimit?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('isAtFreeLimit : ', isAtFreeLimit);

  return (
    <>
      <div className="relative">
        {cloneElement(children as React.ReactElement<any>, {
          children: isAtFreeLimit ? (
            <Button size="sm" asChild variant="outline">
              <Link href="/upgrade">연락처 3개 한도 도달 · 업그레이드</Link>
            </Button>
          ) : (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              연락처 추가
            </Button>
          ),
        })}
      </div>

      <AddContactModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        isAtFreeLimit={isAtFreeLimit}
      />
    </>
  );
}
