import { instance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const queryKey = 'useGetAllShoppingList';

export const useGetAllShoppingList = () => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return instance({
        url: '/shoppingList',
        method: 'GET',
      });
    },
    select: (list) => list.data,
  });
};
