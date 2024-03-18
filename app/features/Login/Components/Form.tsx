'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/Components';

const Form = () => {
  const t = useTranslations('LoginPage');

  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { trigger, register } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="flex gap-20 flex-col">
      <div className="flex flex-col gap-6">
        <Input
          {...register('email')}
          type={'email'}
          label={t('yourEmail')}
          id={'email'}
          placeholder={'name@email.com'}
          onBlur={() => trigger('email')}
        />
        <Input
          {...register('password')}
          type={'password'}
          label={t('yourPassword')}
          id={'password'}
          placeholder={String.fromCharCode(9679).repeat(10)}
          onBlur={() => trigger('password')}
        />
      </div>
      <Button color="primary" variant="flat" type="submit">
        {t('logIn')}
      </Button>
    </form>
  );
};

export default Form;
