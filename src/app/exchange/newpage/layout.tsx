"use client";

import { BackHeader } from "@/components/layout/BackHeader";
import { usePathname } from "next/navigation";

export default function NewPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const exchangeName = pathname.split('/').pop();
  
  return (
    <>
      <BackHeader backLink={`/exchange/${exchangeName}`} />
      {children}
    </>
  );
}
