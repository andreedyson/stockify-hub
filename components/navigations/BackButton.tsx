"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton({
  className,
  children,
  size,
}: React.PropsWithChildren<{
  className?: string;
  size?: number;
}>) {
  const router = useRouter();
  return (
    <div className={className} onClick={() => router.back()}>
      <ArrowLeft size={size || 20} className="cursor-pointer lg:hidden" />
      {children}
    </div>
  );
}

export default BackButton;
