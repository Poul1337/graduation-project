import { instance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export type UserDataProps = {
  email: string;
  name: string;
  secondName: string;
  occupation: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
};

type OnOpen = () => void;

export const usePostUser = (onOpen: OnOpen) => {
  const t = useTranslations('LoginPage');

  return useMutation({
    mutationFn: (userData: UserDataProps) => {
      return instance({
        url: '/user',
        method: 'POST',
        data: userData,
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      onOpen();
      toast.success(t('userCreated'));
    },
    onError: (error: any) => {
      toast.error(t(error?.response?.data?.message));
    },
  });
};
