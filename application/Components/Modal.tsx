'use client';

import React, { FC } from 'react';
import {
  ModalProps as ModalPropsNextUi,
  Modal as ModalNextUi,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { checkGender } from '@/utils/checkGender';
import { Button } from '.';
import Link from 'next/link';

type ModalProps = ModalPropsNextUi & {
  userName: string;
  href?: string;
};

const Modal: FC<ModalProps> = ({ isOpen, onOpenChange, userName, href }) => {
  const t = useTranslations('LoginPage');

  const gender = checkGender(userName);

  return (
    <ModalNextUi
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <p className="text-white text-center pt-10">
                {t('thanksForJoining', { gender })}
              </p>
            </ModalBody>
            {href && (
              <ModalFooter className="flex justify-center">
                <Link href={href}>
                  <Button color="primary" variant="flat" onPress={onClose}>
                    {t('logIn')}
                  </Button>
                </Link>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </ModalNextUi>
  );
};

export default Modal;
