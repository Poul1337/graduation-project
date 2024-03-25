'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { Button, Input } from '@/Components';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Form = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();

  const schema = z.object({
    email: z.string().email(t('wrongEmail')),
    password: z.string(),
  });

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const submit = async (values: z.infer<typeof schema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/ordersList',
      redirect: false,
    });

    if (signInData?.error) {
      toast.error(t(signInData?.error));
    } else {
      router.push('/ordersList');
      toast.success(t('hello'));
    }
  };

  return (
    <form className="flex gap-20 flex-col" onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-6">
        <Input
          {...register('email')}
          label={t('yourEmail')}
          id={'email'}
          placeholder={'name@email.com'}
          onBlur={() => trigger('email')}
          errorMessage={errors.email && errors.email?.message}
        />
        <Input
          {...register('password')}
          label={t('yourPassword')}
          id={'password'}
          placeholder={String.fromCharCode(9679).repeat(10)}
        />
      </div>
      <Button color="primary" variant="flat" type="submit">
        {t('logIn')}
      </Button>
    </form>
  );
};

export default Form;
