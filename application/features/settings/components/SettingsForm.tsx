'use client';

import { useSession } from 'next-auth/react';
import DriverForm from './DriverForm';
import SalesManForm from './SalesManForm';
import { LoadingPage } from '@/Components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { EnglandFlagIcon, PolandFlagIcon } from '@/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Occupation } from '@prisma/client';

const SettingsForm = () => {
  const { data, status } = useSession();
  const t = useTranslations('settings');
  const pathname = usePathname();
  const endPoint = pathname.slice(4);

  return (
    <>
      {status === 'loading' && <LoadingPage />}
      <section className="flex justify-center w-screen items-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack">
        <Image
          src="/images/background-image.jpg"
          alt="Backgroud image"
          fill
          className="-z-10 object-cover object-center"
        />
        <div className="bg-bluishGray p-10 rounded-lg gap-5 flex flex-col">
          <h1 className="text-white">{t('editData')}</h1>
          {data?.user.occupation === Occupation.DRIVER ? (
            <DriverForm />
          ) : (
            <SalesManForm />
          )}
          <div className="flex gap-2 text-white flex-col items-center">
            <h2>{t('chooseLanguage')}</h2>
            <div className="flex gap-5">
              <Link href={`/en/${endPoint}`}>
                <EnglandFlagIcon />
              </Link>
              <Link href={`/pl/${endPoint}`}>
                <PolandFlagIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SettingsForm;
