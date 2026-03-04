import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient(rememberMe: boolean = false) {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // 자동 로그인이 체크된 경우 만료 시간을 30일로 연장
              const extendedOptions = rememberMe
                ? { ...options, maxAge: 60 * 60 * 24 * 30 }
                : options;

              cookieStore.set(name, value, extendedOptions);
            });
          } catch {
            // Server Component에서 setAll이 호출된 경우 무시
          }
        },
      },
    }
  );
}
