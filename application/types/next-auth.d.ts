import { UserRoles } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
  interface User {
    email: string;
    occupation?: string;
    id: string;
  }

  interface Session {
    user: User;
  }
}
