import { instance } from '@/lib/axios';
import { DriversAreas, LicensePlate } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

type EditUserDataProps = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  licensePlate?: LicensePlate | string;
  driversArea?: DriversAreas | string;
};

export type useEditUserProps = {
  id?: string;
  currentEmail?: string;
};

export const useEditUser = ({ id, currentEmail }: useEditUserProps) => {
  const t = useTranslations('settings');

  return useMutation({
    mutationFn: (userData: EditUserDataProps) => {
      return instance({
        url: `/user`,
        method: 'PUT',
        data: { ...userData, id, currentEmail },
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      toast.success(t('userEdited'));
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        toast.error(t(error?.response?.data?.message));
      } else {
        toast.error(t(error?.response?.data));
      }
    },
  });
};
