'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Checkbox, InputForm } from '@/Components';

const Form = () => {
  const t = useTranslations('LoginPage');

  const schema = z
    .object({
      email: z.string().email(t('wrongEmail')),
      password: z
        .string()
        .min(8, t('shortPassword'))
        .regex(new RegExp(/[A-Z]+/), t('passwordCompositionCapitalLetter'))
        .regex(new RegExp(/\d+/), t('passwordCompositionDigit')),
      passwordConfirmation: z.string(),
      name: z.string().min(1, t('isRequired')),
      secondName: z.string().min(1, t('isRequired')),
      company: z.string().min(1, t('isRequired')),
      street: z.string().min(1, t('isRequired')),
      number: z
        .string()
        .min(1, t('isRequired'))
        .transform((data) => Number(data)),
      terms: z.literal(true, {
        errorMap: () => ({
          message: t('termsRequired'),
        }),
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ['passwordConfirmation'],
      message: t('samePasswords'),
    });

  const {
    trigger,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <form className="flex flex-col gap-5">
      <div className="flex gap-4">
        <InputForm
          id="name"
          labelName={t('name')}
          placeholder="John"
          type="text"
          className="w-52"
          {...register('name')}
          onBlur={() => trigger('name')}
          error={errors.name && errors.name?.message}
        />
        <InputForm
          id="secondName"
          labelName={t('secName')}
          placeholder="Doe"
          type="text"
          className="w-52"
          {...register('secondName')}
          onBlur={() => trigger('secondName')}
          error={errors.secondName && errors.secondName?.message}
        />
      </div>
      <InputForm
        id="email"
        labelName={t('email')}
        placeholder="name@email.com"
        type="text"
        className="w-full"
        {...register('email')}
        onBlur={() => trigger('email')}
        error={errors.email && errors.email?.message}
      />
      <InputForm
        id="company"
        labelName={t('company')}
        placeholder="Facebook"
        type="text"
        className="w-full"
        {...register('company')}
        onBlur={() => trigger('company')}
        error={errors.company && errors.company?.message}
      />
      <div className="flex gap-4">
        <InputForm
          id="street"
          labelName={t('street')}
          placeholder="Łabiszyńska"
          type="text"
          {...register('street')}
          onBlur={() => trigger('street')}
          error={errors.street && errors.street?.message}
        />
        <InputForm
          id="number"
          labelName={t('number')}
          placeholder="25"
          type="number"
          {...register('number')}
          onBlur={() => trigger('number')}
          error={errors.number && errors.number?.message}
        />
      </div>
      <InputForm
        id="password"
        labelName={t('yourPassword')}
        placeholder={String.fromCharCode(9679).repeat(10)}
        type="password"
        className="w-full"
        {...register('password')}
        onBlur={() => trigger('password')}
        error={errors.password && errors.password?.message}
      />
      <InputForm
        id="passwordConfirmation"
        labelName={t('repeatPassword')}
        placeholder={String.fromCharCode(9679).repeat(10)}
        type="password"
        className="w-full"
        error={
          errors.passwordConfirmation && errors.passwordConfirmation?.message
        }
        {...register('passwordConfirmation')}
        onBlur={() => trigger('passwordConfirmation')}
      />
      <Checkbox
        label={t('terms')}
        {...register('terms')}
        onBlur={() => trigger('terms')}
        error={errors.terms && errors.terms?.message}
      />
      <button className="w-full h-10 border-grayishBlue rounded-2xl hover:bg-turquoise mt-4 border-2">
        {t('signUp')}
      </button>
    </form>
  );
};

export default Form;
