'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, SelectItem, useDisclosure } from '@nextui-org/react';

import { Checkbox, Modal, Select } from '@/Components';
import { Input } from '@/Components';
import { usePostUser } from '@/hooks/usePostUser';

const Form = () => {
  const t = useTranslations('LoginPage');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate } = usePostUser(onOpen);

  const schema = z
    .object({
      terms: z.literal(true, {
        errorMap: () => ({
          message: t('termsRequired'),
        }),
      }),
      occupation: z.enum([t('driver'), t('salesMan')], {
        errorMap: () => ({ message: t('isRequired') }),
      }),
      email: z.string().email(t('wrongEmail')),
      password: z
        .string()
        .min(8, t('shortPassword'))
        .regex(new RegExp(/[A-Z]+/), t('passwordCompositionCapitalLetter'))
        .regex(new RegExp(/\d+/), t('passwordCompositionDigit')),
      passwordConfirmation: z.string(),
      name: z.string().min(1, t('isRequired')),
      secondName: z.string().min(1, t('isRequired')),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ['passwordConfirmation'],
      message: t('samePasswords'),
    });

  const {
    trigger,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const submit = async (values: z.infer<typeof schema>) => {
    mutate(values);
  };

  const userName = watch('name');

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
        <div className="flex gap-4">
          <Input
            id="name"
            label={t('name')}
            placeholder="John"
            className="w-52"
            {...register('name')}
            onBlur={() => trigger('name')}
            errorMessage={errors.name && errors.name?.message}
          />
          <Input
            id="secondName"
            label={t('secName')}
            placeholder="Doe"
            className="w-52"
            {...register('secondName')}
            onBlur={() => trigger('secondName')}
            errorMessage={errors.secondName && errors.secondName?.message}
          />
        </div>
        <Input
          id="email"
          label={t('email')}
          placeholder="name@email.com"
          className="w-full"
          {...register('email')}
          onBlur={() => trigger('email')}
          errorMessage={errors.email && errors.email?.message}
        />
        <Select
          // eslint-disable-next-line react/no-children-prop
          children={[
            <SelectItem key={t('driver')}>{t('driver')}</SelectItem>,
            <SelectItem key={t('salesMan')}>{t('salesMan')}</SelectItem>,
          ]}
          variant="underlined"
          errorMessage={errors.occupation && errors.occupation?.message}
          {...register('occupation')}
          label={t('selectOccupation')}
        />
        <Input
          id="password"
          label={t('yourPassword')}
          placeholder={String.fromCharCode(9679).repeat(10)}
          className="w-full"
          {...register('password')}
          onBlur={() => trigger('password')}
          errorMessage={errors.password && errors.password?.message}
        />
        <Input
          id="passwordConfirmation"
          label={t('repeatPassword')}
          placeholder={String.fromCharCode(9679).repeat(10)}
          className="w-full"
          errorMessage={
            errors.passwordConfirmation && errors.passwordConfirmation?.message
          }
          {...register('passwordConfirmation')}
          onBlur={() => trigger('passwordConfirmation')}
        />
        <Checkbox
          {...register('terms')}
          errorMessage={errors.terms && errors.terms?.message}
          label={t('terms')}
        />
        <Button color="primary" variant="flat" type="submit">
          {t('signUp')}
        </Button>
      </form>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
        userName={userName}
        href="/login"
      />
    </>
  );
};

export default Form;
