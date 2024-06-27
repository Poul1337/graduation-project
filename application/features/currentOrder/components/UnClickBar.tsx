import { Checkbox } from '@/Components';
import { sellProduct } from '@prisma/client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FC, useRef, useState } from 'react';

type UnClickBarProps = {
  props: sellProduct;
};

const UnClickBar: FC<UnClickBarProps> = ({ props }) => {
  const { priceBrutto, priceNetto, productName, quantity, unit } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const t = useTranslations('currentOrder');

  const handleCheckboxChange = () => {
    setIsChecked(ref.current?.checked || false);
  };

  return (
    <section
      className={clsx(
        'flex px-5 py-5 text-white rounded-lg min-w-[1000px] justify-between bg-bluishGray duration-200',
        {
          'opacity-50': isChecked,
        }
      )}
    >
      <div className="flex justify-start">
        <Checkbox ref={ref} onChange={handleCheckboxChange} />
        <span className="flex items-center w-[400px]">
          <h1>{productName}</h1>
        </span>
      </div>
      <div className="flex items-center w-[400px] justify-between">
        <span className="flex items-center w-[50px] justify-center">
          {quantity}
        </span>
        <span className="flex items-center w-[110px] justify-center">
          {t(unit.toLocaleLowerCase())}
        </span>
        <span className="flex items-center w-[50px] justify-center">23%</span>
        <span className="flex items-center w-[50px] text-center justify-center">
          {priceNetto}$
        </span>
        <span className="flex items-center w-[50px] justify-center">
          {priceBrutto}$
        </span>
      </div>
    </section>
  );
};

export default UnClickBar;
