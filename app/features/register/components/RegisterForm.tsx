import { useTranslations } from "next-intl";
import { Link } from "@nextui-org/react";

import Form from "./Form";

const RegisterForm = () => {
  const t = useTranslations("LoginPage");
  return (
    <section className="flex flex-col px-20 bg-greyBlack rounded-md pt-10 text-white gap-16 items-center">
      <h1 className="text-2xl">{t("signUp")}</h1>
      <Form />
      <div className={"flex flex-col items-center mb-14"}>
        <h2 className={"text-sm"}>{t("haveAccount")}</h2>
        <Link href={"login"} underline="always" size="sm">
          {t("logIn")}
        </Link>
      </div>
    </section>
  );
};

export default RegisterForm;
