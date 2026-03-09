'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function AuthSuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // ✅ 쿠키 대신 URL 파라미터에서 바로 읽기
    const app_redirect = searchParams.get('app_redirect');
    console.log('app_redirect:', app_redirect); // 디버깅

    if (app_redirect) {
      window.location.href = `${app_redirect}?status=success`;
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>앱으로 이동 중...</p>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
