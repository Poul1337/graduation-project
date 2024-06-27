'use client';

import Image from 'next/image';
import { useGetAllSellOrders } from '@/hooks/useGetAllSellOrders';
import { useSession } from 'next-auth/react';
import OrderBar from './OrderBar';
import { SellOrders } from '@/types/OrderType';
import { LoadingPage } from '@/Components';

const OrdersListPage = () => {
  const { data: session } = useSession();
  const { data: ordersData, status } = useGetAllSellOrders({
    userId: session?.user?.id,
  });

  return (
    <>
      {status === 'pending' && <LoadingPage />}
      <main className="flex justify-center w-screen items-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack overflow-auto">
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
    </>
  );
};

export default OrdersListPage;
