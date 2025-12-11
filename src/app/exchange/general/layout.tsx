"use client";

import { BackHeader } from "@/components/layout/BackHeader";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GeneralPageContext } from "./context";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const exchangeName = pathname.split("/").pop();
  const [currentStep, setCurrentStep] = useState(0);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      // 첫 번째 단계면 newpage로 이동
      window.location.href = `/exchange/newpage/${exchangeName}`;
    }
  };

  return (
    <GeneralPageContext.Provider
      value={{ currentStep, setCurrentStep, handleBack }}
    >
      <div className="bg-gray-900">
        <BackHeader
          backLink={`/exchange/newpage/${exchangeName}`}
          onClose={handleBack}
          showCustomerService={true}
        />
        <main>{children}</main>
      </div>
    </GeneralPageContext.Provider>
  );
}
