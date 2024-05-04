import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import { prisma } from './prismaClient';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login' || '/',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { type: 'email', placeholder: 'name@example.com' },
        password: {
          type: 'password',
          placeholder: String.fromCharCode(9679).repeat(10),
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          throw new Error('userDoesntExists');
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password as string
        );

        if (!passwordMatch) {
          throw new Error('wrongPassword');
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          occupation: existingUser.occupation,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          occupation: token.occupation,
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          occupation: user.occupation,
          email: user.email,
        };
      }
      return token;
    },
  },
};
