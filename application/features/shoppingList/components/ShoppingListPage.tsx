/* eslint-disable react/no-children-prop */
'use client';

import { Occupation } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import AddListButton from './AddListButton';
import AddToListModal from './AddToListModal';
import { useDisclosure } from '@nextui-org/react';
import { useGetAllShoppingList } from '@/hooks/useGetAllShoppingList';
import { LoadingPage } from '@/Components';
import Link from 'next/link';

const ShoppingListPage = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: shoppingLists, status } = useGetAllShoppingList();

  return (
    <main className="flex justify-center w-screen items-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack">
      <Image
        src="/images/background-image.jpg"
        alt="Backgroud image"
        fill
        className="-z-10 object-cover object-center"
      />
      {session?.user.occupation === Occupation.SALESMAN && (
        <AddListButton onOpen={onOpen} />
      )}
      {status === 'pending' && <LoadingPage />}
      <div className="flex gap-5 max-w-[1500px] flex-wrap">
        {shoppingLists?.map((list: any) => {
          return (
            <Link href={`/shoppingList/${list.id}`} key={list.id}>
              <div className="text-white rounded-lg bg-bluishGray px-20 flex justify-center flex-col gap-20 py-5 w-[220px] text-center hover:scale-105 duration-200">
                {list.name}
                <span className="text-center">
                  {'0/' + list.products.length}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <AddToListModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        children={undefined}
        onOpen={onOpen}
      />
    </main>
  );
};

export default ShoppingListPage;
