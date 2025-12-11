"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";
import { OKX_GUIDE_STEPS } from "@/lib/okx-guide-data";
import { useGeneralPageContext } from "../layout";

interface ExchangeGeneralPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeGeneralPage({
  params,
}: ExchangeGeneralPageProps) {
  const { name } = use(params);
  const { currentStep, setCurrentStep } = useGeneralPageContext();
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  // OKX 거래소가 아니거나 가이드 데이터가 없으면 notFound
  if (exchange.id !== "okx" || !OKX_GUIDE_STEPS.length) {
    notFound();
  }

  const currentGuide = OKX_GUIDE_STEPS[currentStep];
  const isLastStep = currentStep === OKX_GUIDE_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // 마지막 단계에서는 가입 완료 페이지로 이동
      window.location.href = `/exchange/complete/${name}`;
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">{currentGuide.title}</h1>
        <p className="text-sm text-blue-500">{currentGuide.description}</p>
      </div>
      <div className="w-70 mx-auto">
        {/* 현재 단계 이미지 */}
        <div className="mb-4 h-[70vh] min-h-[400px] overflow-hidden rounded-lg">
          <Image
            src={currentGuide.image}
            alt={`${exchange.name} ${currentGuide.title} 가이드`}
            width={800}
            height={1200}
            className="w-full h-full object-cover object-top rounded-lg"
          />
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex justify-center gap-2 mb-6">
          {OKX_GUIDE_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentStep
                  ? "bg-blue-500 w-8"
                  : index < currentStep
                  ? "bg-blue-300 w-4"
                  : "bg-gray-600 w-4"
              }`}
            />
          ))}
        </div>

        {/* 다음 버튼 */}
        <FixedBottomButton onClick={handleNext} bgOpacity={90}>
          {isLastStep ? "가입 완료" : "다음"}
        </FixedBottomButton>
      </div>
    </>
  );
}
