"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";
import { OKX_GUIDE_STEPS } from "@/lib/exchanges/okx-guide-data";
import { MEXC_GUIDE_STEPS } from "@/lib/exchanges/mexc-guide-data";
import { useGeneralPageContext } from "../context";

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

  // 거래소별 가이드 데이터 선택
  let guideSteps;
  if (exchange.id === "okx") {
    guideSteps = OKX_GUIDE_STEPS;
  } else if (exchange.id === "mexc") {
    guideSteps = MEXC_GUIDE_STEPS;
  } else {
    notFound();
  }

  if (!guideSteps.length) {
    notFound();
  }

  const currentGuide = guideSteps[currentStep];
  const isLastStep = currentStep === guideSteps.length - 1;

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
        <div className="mb-4 rounded-lg">
          <Image
            src={currentGuide.image}
            alt={`${exchange.name} ${currentGuide.title} 가이드`}
            width={800}
            height={1200}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex justify-center gap-2 mb-6">
          {guideSteps.map((_, index) => (
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
