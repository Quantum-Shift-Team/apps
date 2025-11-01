"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeSignupPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeSignupPage({ params }: ExchangeSignupPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  const signupGuideImage = 'signupGuideImage' in exchange ? exchange.signupGuideImage : null;

  if (!signupGuideImage) {
    return null;
  }

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          전화번호를 입력해주세요.
        </h1>
        <p className="text-sm text-blue-500">
          버튼을 누르면 바로 거래소 가입 화면으로 이동해요!
        </p>
      </div>
        <div className="w-70 mx-auto">
        <Image 
            src={signupGuideImage}
            alt={`${exchange.name} 가입 가이드`}
            width={800}
            height={1200}
            className="w-full max-w-2xl h-auto object-contain rounded-lg"
        />
        
        <FixedBottomButton bgOpacity={90}>
            다음
        </FixedBottomButton>
        </div>
    </>
  );
}

