import { instance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type UseGetUserArgs = {
  id: string;
};

const queryKey = 'getUser';

export const useGetUser = ({ id }: UseGetUserArgs) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return instance({
        url: '/user',
        method: 'GET',
        params: { id },
      });
    },
  });
};
