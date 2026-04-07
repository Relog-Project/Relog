import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  // Vercel Cron 보안 검증
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const now = new Date();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

  // 발송 안 된 리마인더 중 현재 시각 기준 5분 이내 도달한 것
  const { data: reminders } = await supabase
    .from('reminders')
    .select('*')
    .eq('is_sent', false)
    .lte('remind_at', now.toISOString())
    .gte('remind_at', fiveMinAgo);

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

      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(messages),
      });
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
