'use client';

import Image from 'next/image';
import { useGetAllSellOrders } from '@/hooks/useGetAllSellOrders';
import { useSession } from 'next-auth/react';
import { useGetUser } from '@/hooks/useGetUser';
import OrderBar from './OrderBar';
import { SellOrders } from '@/types/OrderType';

const OrdersListPage = () => {
  const { data: session } = useSession();
  // const { data: userData } = useGetUser({ id: session?.user.id as string });
  const { data: ordersData } = useGetAllSellOrders({
    userId: session?.user?.id,
  });

  return (
    <main className="flex justify-center w-screen items-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack">
      <Image
        src="/images/background-image.jpg"
        alt="Backgroud image"
        fill
        className="-z-10 object-cover object-center"
      />
      <div className="flex flex-col gap-5 w-full px-24">
        {ordersData?.map((order: SellOrders, index: any) => {
          return <OrderBar key={index} props={order} />;
        })}
      </div>
    </main>
  );
};

export default OrdersListPage;
