'use client';

import { useTranslations } from 'next-intl';

const TableHead = () => {
  const t = useTranslations('currentOrder');
  return (
    <section className="flex bg-turquoise px-5 text-white rounded-lg min-w-[1000px] justify-between">
      <h1 className="flex items-center text-sm">{t('productName')}</h1>
      <div className="flex items-center w-[400px] justify-between text-xs">
        <h2 className="flex w-[50px] justify-center text-center">
          {t('quantity')}
        </h2>
        <h3 className="flex w-[110px] justify-center text-center">
          {t('unit')}
        </h3>
        <h4 className="flex w-[50px] justify-center text-center">{t('vat')}</h4>
        <h5 className="flex w-[50px] justify-center text-center">
          {t('priceNetto')}
        </h5>
        <h6 className="flex w-[50px] justify-center text-center">
          {t('priceBrutto')}
        </h6>
      </div>
    </section>
  );
};

export default TableHead;
