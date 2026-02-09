import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For now, accept ANY login for testing
        // This will help us isolate the issue
        console.log("Login attempt:", credentials?.email);
        
        if (!credentials?.email) {
          return null;
        }
        
        // Return a dummy user
        return {
          id: "1",
          email: credentials.email,
          name: "Test User",
          credits: 10
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.credits = (user as any).credits;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).credits = token.credits as number;
      }
      return session;
    }
  },
  debug: true, // Enable debug mode
};