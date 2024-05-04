'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';

import { Input, LoadingPage } from '@/Components';
import { useSession } from 'next-auth/react';
import { useEditUser } from '@/hooks/useEditUser';

const SalesManForm = () => {
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
      {isSubmitting && <LoadingPage />}
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
        <Button color="primary" variant="flat" type="submit">
          {t('saveSettings')}
        </Button>
      </form>
    </>
  );
};

export default SalesManForm;
