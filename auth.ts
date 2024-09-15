import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { User, UserRole } from "@prisma/client";
import { get2faConfmByUserId } from "./data/2fa-confirmation";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const _user = user as User;
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(_user.id);
      if (!existingUser || !existingUser.emailVerified) return false;
      if (existingUser.isTwoFactorEnabled) {
        const _2faConfirmation = await get2faConfmByUserId(existingUser.id);
        if (!_2faConfirmation) {
          return false;
        }
        await db.twoFactorConfirmation.delete({
          where: { id: _2faConfirmation.id },
        });
      }
      return true;
    },
    async session({ token, session }) {
      console.log(`SESSION TOKEN: (${JSON.stringify(token)}) | SESSION: (${JSON.stringify(session)})`);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      console.log(`TOKEN: (${JSON.stringify(token)})`);
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
