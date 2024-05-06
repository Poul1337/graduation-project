import { prisma } from '@/lib/prismaClient';
import { DriversAreas, Occupation } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const searchParam = req.nextUrl.searchParams.get('userId');

    const user = await prisma.user.findUnique({
      where: { id: searchParam as string },
    });

    if (user?.occupation === Occupation.DRIVER) {
      const driverOrders = await prisma.sellOrders.findMany({
        where: { area: user.drivingArea as DriversAreas },
        include: { products: true },
      });

      return NextResponse.json(driverOrders, { status: 200 });
    } else {
      const salesManOrders = await prisma.sellOrders.findMany({
        include: { products: true },
      });

      return NextResponse.json(salesManOrders, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
};
