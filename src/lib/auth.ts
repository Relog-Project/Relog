// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@/src/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          throw new Error(error?.message || '로그인 정보를 확인해주세요.');
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const supabaseAdmin = createSupabaseClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        console.log('SignIn Callback - Syncing Google user:', user.email);

        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
        let targetUser = users.find(u => u.email === user.email);

        if (!targetUser) {
          console.log('SignIn Callback - Creating user in Supabase Auth...');
          const { data: { user: newUser }, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: user.email!,
            email_confirm: true,
            user_metadata: { name: user.name },
            password: Math.random().toString(36).slice(-12),
          });

          if (createError) {
            console.error('SignIn Callback - Error creating user:', createError);
            return true;
          }
          targetUser = newUser!;
        }

        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('id', targetUser.id)
          .single();

        if (!existingUser) {
          await supabaseAdmin.from('users').insert({
            id: targetUser.id,
            email: user.email,
            name: user.name,
            created_at: new Date().toISOString(),
          });
        }

        // 여기에 ID를 저장해두면 jwt 콜백의 user 객체로 전달됩니다.
        user.id = targetUser.id;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // 로그인을 시도할 때(최초 1회) user 객체가 존재합니다.
      if (user) {
        token.id = user.id;
        console.log('JWT Callback - Setting token.id to:', token.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        // console.log('Session Callback - session.user.id:', (session.user as any).id);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/auth-success')) return url;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
