import { prisma } from '@/lib/prismaClient';
import { NextResponse } from 'next/server';
import { compare, hash } from 'bcrypt';

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

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const { id, email, licensePlate, driverArea, newPassword, currentEmail } =
      body;

    const getExisingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (licensePlate) {
      const checkLicensePlate = await prisma.user.findUnique({
        where: {
          licensePlate,
        },
      });
      if (checkLicensePlate) {
        return NextResponse.json(
          { user: null, message: 'existingLicensePlate' },
          { status: 409 }
        );
      }
    }

    const passwordMatch = await compare(
      newPassword,
      getExisingUser?.password as string
    );

    if (passwordMatch) {
      return NextResponse.json(
        { user: null, message: 'allreadyUsingThisPassword' },
        { status: 409 }
      );
    }

    if (getExisingUser?.drivingArea === driverArea) {
      return NextResponse.json(
        { user: null, message: 'allreadyOnThisArea' },
        { status: 409 }
      );
    }

    if (getExisingUser?.email === email) {
      return NextResponse.json(
        { user: null, message: 'allreadyUseThisEmail' },
        { status: 409 }
      );
    }

    const bcrypt = await hash(newPassword, 10);

    const updatedData: any = {};
    if (email) updatedData.email = email;
    if (licensePlate) updatedData.licensePlate = licensePlate;
    if (driverArea) updatedData.drivingArea = driverArea;
    if (newPassword) updatedData.password = bcrypt;

    if (Object.keys(updatedData).length === 0) {
      throw new Error('nonData');
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { ...updatedData },
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
