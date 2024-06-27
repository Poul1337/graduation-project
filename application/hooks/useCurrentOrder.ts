import { instance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export type UseGetCurrentOrderArgs = {
  orderId?: string;
  userId?: string | null;
};

const queryKey = 'getCurrentOrder';
export const useGetCurrentOrder = ({
  orderId,
  userId,
}: UseGetCurrentOrderArgs) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return instance({
        url: '/sellOrders',
        method: 'GET',
        params: { orderId, userId },
      });
    },
    select: (order) => order.data,
  });
};
