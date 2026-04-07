export interface IWork {
  id: string;
  contactId: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
  amount: number | null;
  is_paid: boolean;
  paid_at: string | null;
}
