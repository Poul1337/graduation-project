/* eslint-disable react/no-children-prop*/
'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import AddListButton from './AddListButton';
import { Occupation } from '@prisma/client';
import { useDisclosure } from '@nextui-org/react';
import AddProductModal from './AddProductModal';

const CurrentShoppingListPage = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
      <AddProductModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        children={undefined}
        onOpen={onOpen}
      />
    </main>
  );
};

export default CurrentShoppingListPage;
