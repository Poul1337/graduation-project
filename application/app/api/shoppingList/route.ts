import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const allShoppingLists = await prisma.shoppingList.findMany({
      include: { products: true },
    });

    return NextResponse.json(allShoppingLists, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const existingShoppingLists = await prisma.shoppingList.findMany();

    const listExists = existingShoppingLists.some((list) => {
      return list.name.toLocaleLowerCase() === body?.toLocaleLowerCase();
    });

    if (listExists) {
      return NextResponse.json('listExists', { status: 409 });
    }

    const shoppingList = await prisma.shoppingList.create({
      data: {
        name: body,
      },
      include: { products: true },
    });

    return NextResponse.json(shoppingList, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
};
