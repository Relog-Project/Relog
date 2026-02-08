"use client"

import { AddWorkModal } from "@/components/dashboard/add-work-modal"
import { Button } from "@/components/ui/button"
import { contacts, works, type Work } from "@/mocks/data"
import { ArrowLeft, Building2, Mail, Phone, Plus } from "lucide-react"
import Link from "next/link"
import { use, useState } from "react"

export default function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const contact = contacts.find((c) => c.id === id)
  const [contactWorks, setContactWorks] = useState<Work[]>(
    works.filter((w) => w.contactId === id)
  )
  const [showModal, setShowModal] = useState(false)

  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">연락처를 찾을 수 없습니다.</p>
      </div>
    )
  }

  function handleAddWork(work: Omit<Work, "id" | "contactId">) {
    const newWork: Work = {
      ...work,
      id: `w-${Date.now()}`,
      contactId: id,
    }
    setContactWorks((prev) => [newWork, ...prev])
  }

  return (
    <div>
      <div className="border-b border-border px-8 py-6">
        <Link
          href="/dashboard/contacts"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Contacts
        </Link>
        <div className="mt-4 flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {contact.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {contact.name}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {contact.title} · {contact.company}
              </p>
            </div>
          </div>
          <Button size="sm" onClick={() => setShowModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            작업 추가
          </Button>
        </div>
      </div>

      <div className="grid gap-8 p-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              연락처 정보
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{contact.company}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              관계 메모
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              {contact.notes}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-card-foreground">
                작업 이력
              </h2>
            </div>
            {contactWorks.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-muted-foreground">
                아직 기록된 작업이 없습니다.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {contactWorks
                  .sort(
                    (a, b) =>
                      new Date(b.startDate).getTime() -
                      new Date(a.startDate).getTime()
                  )
                  .map((work) => (
                    <div key={work.id} className="px-6 py-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-card-foreground">
                            {work.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {work.startDate} ~ {work.endDate || "진행 중"}
                          </p>
                        </div>
                        {!work.endDate && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            진행 중
                          </span>
                        )}
                        {work.endDate && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            완료
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {work.description}
                      </p>
                      <div className="mt-3 border-l-2 border-border pl-3">
                        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddWorkModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddWork}
      />
    </div>
  )
}
