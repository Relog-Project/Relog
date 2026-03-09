import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/src/lib/auth';
import { encode } from 'next-auth/jwt';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'No session' }, { status: 401 });
  }

  const token = await encode({
    token: {
      email: session.user?.email,
      id: (session.user as any)?.id,
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return NextResponse.json({ token });
}
