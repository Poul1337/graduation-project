import { useTranslations } from "next-intl";

const RegisterForm = () => {
  const t = useTranslations("LoginPage");
  return (
    <section>
      <h1>{t("signUp")}</h1>
    </section>
  );
};

export default RegisterForm;
