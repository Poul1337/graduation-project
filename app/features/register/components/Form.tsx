"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";

import { Checkbox } from "@/Components";
import { Input } from "@/Components";

const Form = () => {
  const t = useTranslations("LoginPage");

  const schema = z
    .object({
      email: z.string().email(t("wrongEmail")),
      password: z
        .string()
        .min(8, t("shortPassword"))
        .regex(new RegExp(/[A-Z]+/), t("passwordCompositionCapitalLetter"))
        .regex(new RegExp(/\d+/), t("passwordCompositionDigit")),
      passwordConfirmation: z.string(),
      name: z.string().min(1, t("isRequired")),
      secondName: z.string().min(1, t("isRequired")),
      company: z.string().min(1, t("isRequired")),
      street: z.string().min(1, t("isRequired")),
      number: z
        .string()
        .min(1, t("isRequired"))
        .transform((data) => Number(data)),
      terms: z.literal(true, {
        errorMap: () => ({
          message: t("termsRequired"),
        }),
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: t("samePasswords"),
    });

  const {
    trigger,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <form className="flex flex-col gap-5">
      <div className="flex gap-4">
        <Input
          id="name"
          label={t("name")}
          placeholder="John"
          type="text"
          className="w-52"
          {...register("name")}
          onBlur={() => trigger("name")}
          errorMessage={errors.name && errors.name?.message}
        />
        <Input
          id="secondName"
          label={t("secName")}
          placeholder="Doe"
          type="text"
          className="w-52"
          {...register("secondName")}
          onBlur={() => trigger("secondName")}
          errorMessage={errors.secondName && errors.secondName?.message}
        />
      </div>
      <Input
        id="email"
        label={t("email")}
        placeholder="name@email.com"
        type="text"
        className="w-full"
        {...register("email")}
        onBlur={() => trigger("email")}
        errorMessage={errors.email && errors.email?.message}
      />
      <Input
        id="company"
        label={t("company")}
        placeholder="Facebook"
        type="text"
        className="w-full"
        {...register("company")}
        onBlur={() => trigger("company")}
        errorMessage={errors.company && errors.company?.message}
      />
      <div className="flex gap-4">
        <Input
          id="street"
          label={t("street")}
          placeholder="Łabiszyńska"
          type="text"
          {...register("street")}
          onBlur={() => trigger("street")}
          errorMessage={errors.street && errors.street?.message}
        />
        <Input
          id="number"
          label={t("number")}
          placeholder="25"
          type="number"
          {...register("number")}
          onBlur={() => trigger("number")}
          errorMessage={errors.number && errors.number?.message}
        />
      </div>
      <Input
        id="password"
        label={t("yourPassword")}
        placeholder={String.fromCharCode(9679).repeat(10)}
        type="password"
        className="w-full"
        {...register("password")}
        onBlur={() => trigger("password")}
        errorMessage={errors.password && errors.password?.message}
      />
      <Input
        id="passwordConfirmation"
        label={t("repeatPassword")}
        placeholder={String.fromCharCode(9679).repeat(10)}
        type="password"
        className="w-full"
        errorMessage={
          errors.passwordConfirmation && errors.passwordConfirmation?.message
        }
        {...register("passwordConfirmation")}
        onBlur={() => trigger("passwordConfirmation")}
      />
      <Checkbox
        color="primary"
        {...register("terms")}
        onBlur={() => trigger("terms")}
        name={t("terms")}
        errorMessage={errors.terms && errors.terms?.message}
      />
      <Button color="primary" variant="flat" type="submit">
        {t("signUp")}
      </Button>
    </form>
  );
};

export default Form;
