import LoginForm from '@/src/features/auth/components/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
