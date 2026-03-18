import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import WorksList from '@/src/features/works/components/works-list';
import { getWorks } from '@/src/features/works/services/get-works';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export default async function WorksPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    redirect('/login');
  }

  // 서버 사이드에서 RLS를 우회하기 위해 service_role 클라이언트 사용
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const works = await getWorks(supabaseAdmin, userId);

  return (
    <div>
      <DashboardHeader
        title="Works"
        description="모든 작업 이력을 확인하세요."
      />
      <div className="p-8">
        <WorksList initialWorks={works || []} />
      </div>
    </div>
  );
}
