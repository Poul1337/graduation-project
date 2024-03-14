'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { InputForm } from '@/Components';

const Form = () => {
  const t = useTranslations('LoginPage');

  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const {
    trigger,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <form className={'flex gap-20 flex-col'}>
      <div className={'flex flex-col gap-6'}>
        <InputForm
          {...register('email')}
          type={'email'}
          labelName={t('yourEmail')}
          id={'email'}
          placeholder={'name@email.com'}
          onBlur={() => trigger('email')}
        />
        <InputForm
          {...register('password')}
          type={'password'}
          labelName={t('yourPassword')}
          id={'password'}
          placeholder={String.fromCharCode(9679).repeat(10)}
          onBlur={() => trigger('password')}
        />
      </div>
      <button
        className={
          'w-full h-10 border-grayishBlue rounded-2xl border-1 hover:bg-turquoise'
        }
      >
        {t('logIn')}
      </button>
    </form>
  );
};

export default Form;
