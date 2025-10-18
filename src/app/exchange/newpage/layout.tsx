"use client";

import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function NewPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const exchangeName = pathname.split('/').pop();
  
  return (
    <div className="min-h-screen bg-gray-900">
      <BackHeader backLink={`/exchange/${exchangeName}`} />
      <main 
        className="pb-24"
        style={{ paddingTop: `${LAYOUT_CONSTANTS.BACK_HEADER_HEIGHT * 0.25}rem` }}
      >
        {children}
      </main>
    </div>
  );
}
