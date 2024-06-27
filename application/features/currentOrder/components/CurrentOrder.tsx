'use client';

import Image from 'next/image';
import CurrentOrderUnclickView from './CurrentOrderUnclickView';
import { useGetCurrentOrder } from '@/hooks/useCurrentOrder';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingPage } from '@/Components';

const CurrentOrder = () => {
  const currentUrl = usePathname().slice(15);
  const { data: session } = useSession();
  const { data: currentOrderData, status } = useGetCurrentOrder({
    orderId: currentUrl,
    userId: session?.user?.id,
  });

  return (
    <>
      {status === 'pending' && <LoadingPage />}
      <main className="flex justify-center w-screen items-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack">
        <Image
          src="/images/background-image.jpg"
          alt="Backgroud image"
          fill
          className="-z-10 object-cover object-center"
        />
        <CurrentOrderUnclickView props={currentOrderData || {}} />
      </main>
    </>
  );
};

export default CurrentOrder;
