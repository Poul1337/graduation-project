import { SellOrders } from '@/types/OrderType';
import { FC } from 'react';
import { CiBoxList, CiLocationArrow1, CiGps } from 'react-icons/ci';

type OrderBarProps = {
  props: SellOrders;
};

const OrderBar: FC<OrderBarProps> = ({ props }) => {
  const { area, buyerName, buyerStreet, products } = props;
  const productsLength = products.length;
  return (
    <section className="flex bg-bluishGray px-16 py-5 justify-between text-white rounded-lg hover:scale-105 duration-200">
      <h1>{buyerName}</h1>
      <div className="flex items-center w-[400px] justify-between">
        <span className="flex items-center gap-1 w-[200px]">
          <CiLocationArrow1 />
          <h2>{buyerStreet}</h2>
        </span>
        <span className="flex items-center gap-1 w-[50px]">
          <CiBoxList />
          <h3>{productsLength}</h3>
        </span>
        <span className="flex items-center gap-1">
          <CiGps />
          <h3>{area}</h3>
        </span>
      </div>
    </section>
  );
};

export default OrderBar;
