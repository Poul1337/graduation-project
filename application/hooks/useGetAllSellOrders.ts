import { instance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export type UseGetAllSellOrdersArgs = {
  userId?: string | null;
};

const queryKey = 'getAllOrders';
export const useGetAllSellOrders = ({ userId }: UseGetAllSellOrdersArgs) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return instance({
        url: '/sellOrders',
        method: 'GET',
        params: { userId },
      });
    },
    select: (order) => order.data,
  });
};
