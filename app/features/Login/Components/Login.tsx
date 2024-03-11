import Image from "next/image";

import LoginForm from "@/features/Login/Components/LoginForm";

const Login = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack">
      <Image
        src="/images/background-image.jpg"
        alt="Backgroud image"
        fill
        className="-z-10 object-cover object-center"
      />
      <LoginForm />
    </main>
  );
};

export default Login;
