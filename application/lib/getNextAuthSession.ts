import NextAuth, { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export const nextAuthHandler = NextAuth(authOptions);

export const getNextAuthSession = () => getServerSession(authOptions);
