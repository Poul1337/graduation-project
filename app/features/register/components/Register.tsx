import Image from "next/image";

const Register = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-t from-almostBlack to-almostBlack">
      <Image
        src="/images/background-image.jpg"
        alt="Backgroud image"
        fill
        className="-z-10 object-cover object-center"
      />
    </main>
  );
};

export default Register;
