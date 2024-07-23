import RegisterForm from "@/components/forms/RegisterForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
};

function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
