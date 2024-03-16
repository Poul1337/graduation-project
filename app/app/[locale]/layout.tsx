import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import { AppContext } from '@/Context';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Graduation Project',
  description: 'Graduation project by Paweł Jaruszewski',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

const RootLayout = async ({
  children,
  params: { locale },
}: RootLayoutProps) => {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppContext>{children}</AppContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
