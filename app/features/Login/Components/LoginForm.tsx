import { useTranslations } from "next-intl";
import Link from "next/link";

import Form from "./Form";

const LoginForm = () => {
  const t = useTranslations("LoginPage");

  return (
    <section className="flex flex-col px-20 bg-greyBlack rounded-md pt-10 text-white gap-16 items-center">
      <h1 className="text-white text-2xl">{t("Login")}</h1>
      <Form />
      <div className={"flex flex-col items-center mb-14"}>
        <h2 className={"text-sm"}>{t("orSignUp")}</h2>
        <Link href={"register"} className={"text-sm underline text-turquoise"}>
          <i>{t("signUp")}</i>
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
