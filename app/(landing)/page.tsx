import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Hero />
      <About />
      <Features />
    </div>
  );
}
