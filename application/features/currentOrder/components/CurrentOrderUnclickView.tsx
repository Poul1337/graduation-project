import { FC } from 'react';
import UnClickBar from './UnClickBar';
import { SellOrders } from '@/types/OrderType';
import TableHead from './TableHead';

type CurrentOrderUnclickViewProps = {
  props: SellOrders;
};

const CurrentOrderUnclickView: FC<CurrentOrderUnclickViewProps> = ({
  props,
}) => {
  const { products } = props;

  return (
    <div className="flex flex-col gap-4">
      <TableHead />
      {products?.map((product, index: number) => {
        return <UnClickBar key={index} props={product} />;
      })}
    </div>
  );
};

export default CurrentOrderUnclickView;
