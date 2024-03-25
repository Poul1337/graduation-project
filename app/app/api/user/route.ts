import { prisma } from '@/lib/prismaClient';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, name, secondName, password, terms, occupation } = body;

    const checkUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (checkUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'existingUser' },
        { status: 409 }
      );
    }

    const bcrypt = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        secondName,
        occupation,
        email,
        password: bcrypt,
        terms,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
