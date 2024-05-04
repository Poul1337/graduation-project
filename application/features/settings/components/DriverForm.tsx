/* eslint-disable react/no-children-prop */
'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, SelectItem } from '@nextui-org/react';

import { Input, LoadingPage, Select } from '@/Components';
import { DriversAreas, LicensePlate } from '@prisma/client';
import { useEditUser } from '@/hooks/useEditUser';
import { getSession, useSession } from 'next-auth/react';

const DriverForm = () => {
  const t = useTranslations('settings');
  const { data } = useSession();
  const { mutate, status } = useEditUser({
    id: data?.user.id as string,
    currentEmail: data?.user.email as string,
  });

  const schema = z
    .object({
      email: z
        .string()
        .email({ message: t('wrongEmail') })
        .optional()
        .or(z.literal('')),
      licensePlate: z
        .enum(
          [
            LicensePlate.WPRAB123,
            LicensePlate.WPRCD456,
            LicensePlate.WPREF789,
            LicensePlate.WPRGH012,
            LicensePlate.WPRIJ345,
            LicensePlate.WPRKL678,
          ],
          {
            errorMap: () => ({ message: t('isRequired') }),
          }
        )
        .optional()
        .or(z.literal('')),
      driverArea: z
        .enum(
          [
            DriversAreas.E,
            DriversAreas.N,
            DriversAreas.NE,
            DriversAreas.NW,
            DriversAreas.S,
            DriversAreas.SE,
            DriversAreas.SW,
            DriversAreas.W,
          ],
          {
            errorMap: () => ({ message: t('isRequired') }),
          }
        )
        .optional()
        .or(z.literal('')),
      newPassword: z
        .string()
        .min(8, t('shortPassword'))
        .regex(new RegExp(/[A-Z]+/), t('passwordCompositionCapitalLetter'))
        .regex(new RegExp(/\d+/), t('passwordCompositionDigit'))
        .optional()
        .or(z.literal('')),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.newPassword === data.passwordConfirmation, {
      path: ['passwordConfirmation'],
      message: t('samePasswords'),
    });

  const {
    trigger,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const submit = async (values: z.infer<typeof schema>) => {
    mutate(values);
    if (status !== 'error') {
      reset();
    }
  };

  return (
    <>
      {status === 'pending' || (isSubmitting && <LoadingPage />)}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
        <Input
          variant="underlined"
          id="email"
          label={t('newEmail')}
          placeholder="name@email.com"
          className="w-full"
          {...register('email')}
          onBlur={() => trigger('email')}
          errorMessage={errors.email && errors.email?.message}
        />
        <div className="flex gap-4">
          <Input
            id="password"
            variant="underlined"
            label={t('newPassword')}
            placeholder={String.fromCharCode(9679).repeat(10)}
            className="w-full"
            {...register('newPassword')}
            onBlur={() => trigger('newPassword')}
            errorMessage={errors.newPassword && errors.newPassword?.message}
          />
          <Input
            id="passwordConfirmation"
            variant="underlined"
            label={t('newPasswordConfirmation')}
            placeholder={String.fromCharCode(9679).repeat(10)}
            className="w-full"
            errorMessage={
              errors.passwordConfirmation &&
              errors.passwordConfirmation?.message
            }
            {...register('passwordConfirmation')}
            onBlur={() => trigger('passwordConfirmation')}
          />
        </div>
        <Select
          children={[
            <SelectItem key={LicensePlate.WPRAB123}>{'WPR AB123'}</SelectItem>,
            <SelectItem key={LicensePlate.WPRCD456}>{'WPR CD456'}</SelectItem>,
            <SelectItem key={LicensePlate.WPREF789}>{'WPR EF789'}</SelectItem>,
            <SelectItem key={LicensePlate.WPRGH012}>{'WPR GH012'}</SelectItem>,
            <SelectItem key={LicensePlate.WPRIJ345}>{'WPR IJ345'}</SelectItem>,
            <SelectItem key={LicensePlate.WPRKL678}>{'WPR KL678'}</SelectItem>,
          ]}
          variant="underlined"
          errorMessage={errors.licensePlate && errors.licensePlate?.message}
          {...register('licensePlate')}
          label={t('selectLicensePlate')}
        />
        <Select
          children={[
            <SelectItem key={DriversAreas.N}>{t('N')}</SelectItem>,
            <SelectItem key={DriversAreas.S}>{t('S')}</SelectItem>,
            <SelectItem key={DriversAreas.NE}>{t('NE')}</SelectItem>,
            <SelectItem key={DriversAreas.SE}>{t('SE')}</SelectItem>,
            <SelectItem key={DriversAreas.NW}>{t('NW')}</SelectItem>,
            <SelectItem key={DriversAreas.SW}>{t('SW')}</SelectItem>,
            <SelectItem key={DriversAreas.W}>{t('W')}</SelectItem>,
            <SelectItem key={DriversAreas.E}>{t('E')}</SelectItem>,
          ]}
          variant="underlined"
          errorMessage={errors.driverArea && errors.driverArea?.message}
          {...register('driverArea')}
          label={t('selectDriverArea')}
        />
        <Button color="primary" variant="flat" type="submit">
          {t('saveSettings')}
        </Button>
      </form>
    </>
  );
};

export default DriverForm;
