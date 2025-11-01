"use client";

import { BackHeader } from "@/components/layout/BackHeader";
import { usePathname } from "next/navigation";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const exchangeName = pathname.split('/').pop();
  
  return (
    <div className="bg-gray-900">
      <BackHeader backLink={`/exchange/newpage/${exchangeName}`} />
      <main>
        {children}
      </main>
    </div>
  );
}

