import { DashboardHeader } from '@/src/components/layout/dashboard/dashboad-header';
import WorksList from '@/src/features/works/components/works-list';

export default function WorksPage() {
  return (
    <div>
      <DashboardHeader
        title="Works"
        description="모든 작업 이력을 확인하세요."
      />
      <div className="p-8">
        <WorksList />
      </div>
    </div>
  );
}
