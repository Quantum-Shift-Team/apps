"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangePasswordPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangePasswordPage({
  params,
}: ExchangePasswordPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  // binance의 경우 binance_create_password_guide.png 사용
  let passwordGuideImage: string | null = null;
  if (exchange.id === "binance") {
    passwordGuideImage = "/exchanges/binance/binance_create_password_guide.png";
  }

  if (!passwordGuideImage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <BackHeader backLink={`/exchange/verified/${exchange.id}`} />
      <main>
        {/* 상단 텍스트 - 왼쪽 정렬 */}
        <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          비밀번호를 생성해주세요.
        </h1>
        <p className="text-sm text-blue-500">
          비밀번호는 여덟글자 이상으로 숫자와 대문자를 포함해야 합니다.
        </p>
      </div>
      <div className="w-70 mx-auto">
        <Image
          src={passwordGuideImage}
          alt={`${exchange.name} 비밀번호 생성 가이드`}
          width={800}
          height={1200}
          className="w-full max-w-2xl h-auto object-contain rounded-lg"
        />

        <FixedBottomButton bgOpacity={90}>다음</FixedBottomButton>
      </div>
      </main>
    </div>
  );
}

