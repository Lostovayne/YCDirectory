import NextAuth, { NextAuthConfig, type Session } from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session as Session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
