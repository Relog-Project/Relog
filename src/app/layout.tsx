import { SupabaseHashCatcher } from '@/src/components/supabase-hash-catcher'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react"
import { AuthProvider } from '@/src/components/providers/auth-provider'

import './globals.css'

const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Relog - 관계 중심 CRM',
  description: '연락처가 아니라 관계를 기록하세요. 외주 개발팀, 영업팀, 프리랜서를 위한 관계 중심 CRM.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          <SupabaseHashCatcher />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
