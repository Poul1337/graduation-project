import { instance } from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { RefObject } from 'react';
import { toast } from 'sonner';

type usePostShoppingListProps = {
  onClose: () => void;
};

export const usePostShoppingList = ({ onClose }: usePostShoppingListProps) => {
  const t = useTranslations('addListModal');

  return useMutation({
    mutationFn: (shoppingListName: string) => {
      return instance({
        url: '/shoppingList',
        method: 'POST',
        data: shoppingListName,
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onError: (error: any) => toast.error(t(error.response.data)),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ['useGetAllShoppingList'] });
    },
  });
};
