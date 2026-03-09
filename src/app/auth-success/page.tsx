'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function AuthSuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const app_redirect = searchParams.get('app_redirect');
    if (!app_redirect) return;

    const getToken = async () => {
      // ✅ 서버에서 토큰 가져오기
      const res = await fetch('/api/auth/token');
      const data = await res.json();
      console.log('token data:', data); // 디버깅

      if (data.token) {
        window.location.href = `${app_redirect}?status=success&token=${encodeURIComponent(data.token)}`;
      } else {
        window.location.href = `${app_redirect}?status=success`;
      }
    };

    getToken();
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
