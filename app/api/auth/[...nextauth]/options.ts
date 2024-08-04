import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (isPasswordCorrect) {
          return {
            id: user.id,
            name: user.fullname,
            email: user.email,
            image: user.image,
          };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (!user.email || !user.name) {
        return false;
      }

      if (account?.provider === "google") {
        const userExist = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!userExist) {
          await prisma.user.create({
            data: {
              fullname: user.name,
              email: user.email,
              image: user.image,
            },
          });
        }

        return true;
      } else {
        return false;
      }
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/signin`;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.createdAt = token.createdAt;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email || undefined,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        name: dbUser.fullname,
        email: dbUser.email,
        image: dbUser.image,
        createdAt: dbUser.createdAt,
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
};
