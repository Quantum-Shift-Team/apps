"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeIdentifyPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeIdentifyPage({
  params,
}: ExchangeIdentifyPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  // identityVerificationGuideImage가 있으면 사용하고, 없으면 signupGuideImage 사용
  const identityVerificationGuideImage: string | null =
    "identityVerificationGuideImage" in exchange
      ? (exchange.identityVerificationGuideImage as string)
      : "signupGuideImage" in exchange
      ? (exchange.signupGuideImage as string)
      : null;

  if (!identityVerificationGuideImage) {
    return null;
  }

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">신원 인증이 필요해요.</h1>
        <p className="text-sm text-blue-500">
          안전한 거래를 위해 신분증, 운전면허증, 여권 중 하나를 선택하여 인증을
          진행해주세요!
        </p>
      </div>
      <div className="w-70 mx-auto">
        <Image
          src={identityVerificationGuideImage}
          alt={`${exchange.name} 신원 인증 가이드`}
          width={800}
          height={1200}
          className="w-full max-w-2xl h-auto object-contain rounded-lg"
        />

        <FixedBottomButton
          href={`/exchange/document-verification/${name}`}
          bgOpacity={90}
        >
          다음
        </FixedBottomButton>
      </div>
    </>
  );
}
