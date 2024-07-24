import RegisterForm from "@/components/forms/RegisterForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register",
};

function RegisterPage() {
  return (
    <main className="h-screen md:grid md:grid-cols-2 lg:grid-cols-3">
      <div className="flex h-full items-center justify-center px-6">
        <RegisterForm />
      </div>
      <div className="relative hidden h-full md:col-span-1 md:block lg:col-span-2">
        <Image
          src={"/assets/container.jpg"}
          width={1200}
          height={1000}
          alt="Container"
          className="h-full object-cover"
          priority={true}
        />
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-40" />
      </div>
    </main>
  );
}

export default RegisterPage;
