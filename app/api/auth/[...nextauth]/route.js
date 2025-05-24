import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user already exists in Supabase
        const { data: existingUser } = await supabase
          .from('users')
          .select()
          .eq('email', user.email)
          .single();

        if (!existingUser) {
          // Create new user in Supabase
          const { error } = await supabase
            .from('users')
            .insert([
              {
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account.provider,
                provider_id: profile.sub,
              },
            ]);

          if (error) {
            console.error('Error creating user in Supabase:', error);
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
        };
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 