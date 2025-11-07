"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeVerifiedPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeVerifiedPage({
  params,
}: ExchangeVerifiedPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  // verificationGuideImage가 있으면 사용하고, 없으면 signupGuideImage 사용
  const verificationGuideImage: string | null =
    "verificationGuideImage" in exchange
      ? (exchange.verificationGuideImage as string)
      : "signupGuideImage" in exchange
      ? (exchange.signupGuideImage as string)
      : null;

  if (!verificationGuideImage) {
    return null;
  }

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          인증번호를 입력해주세요.
        </h1>
        <p className="text-sm text-blue-500">
          인증번호 입력 후 Continue 버튼을 눌러주세요!
        </p>
      </div>
      <div className="w-70 mx-auto">
        <Image
          src={verificationGuideImage}
          alt={`${exchange.name} 인증번호 가이드`}
          width={800}
          height={1200}
          className="w-full max-w-2xl h-auto object-contain rounded-lg"
        />

        <FixedBottomButton href={`/exchange/password/${name}`} bgOpacity={90}>
          다음
        </FixedBottomButton>
      </div>
    </>
  );
}
