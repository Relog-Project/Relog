import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  // CRON_SECRET이 설정된 경우에만 검증
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const now = new Date();

  // 발송 안 된 리마인더 중 remind_at이 현재 시각 이전인 것 모두 처리
  const { data: reminders } = await supabase
    .from('reminders')
    .select('*')
    .eq('is_sent', false)
    .lte('remind_at', now.toISOString());

  if (!reminders || reminders.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sentCount = 0;

  for (const reminder of reminders) {
    // 유저의 push token 조회
    const { data: tokens } = await supabase
      .from('push_tokens')
      .select('token')
      .eq('user_id', reminder.user_id);

    if (tokens && tokens.length > 0) {
      const messages = tokens.map((t: any) => ({
        to: t.token,
        sound: 'default',
        title: reminder.contact_name
          ? `${reminder.contact_name} 팔로업`
          : '리마인더',
        body: reminder.title,
        data: { contactId: reminder.contact_id },
      }));

      const expoRes = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(messages),
      });
      const expoData = await expoRes.json();
      console.log('[cron/reminders] Expo response:', JSON.stringify(expoData));
    }

    // 발송 완료 표시
    await supabase
      .from('reminders')
      .update({ is_sent: true })
      .eq('id', reminder.id);

    sentCount++;
  }

  return NextResponse.json({ sent: sentCount });
}
