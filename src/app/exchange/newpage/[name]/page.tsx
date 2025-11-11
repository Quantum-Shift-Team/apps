"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";

interface ExchangeNewPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeNewPage({ params }: ExchangeNewPageProps) {
  const { name } = use(params);
  const router = useRouter();
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  const handleSignupClick = () => {
    // 새 창에서 거래소 가입 페이지 열기
    if (exchange.referralUrl && exchange.referralUrl.startsWith('http')) {
      window.open(exchange.referralUrl, '_blank');
    }
    // 내 페이지는 signup 페이지로 이동
    router.push(`/exchange/signup/${exchange.id}`);
  };

  return (
    <div className="flex flex-col px-6 py-6 max-w-3xl mx-auto">
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          {exchange.name} 가입을 <br />
          가장 쉽게 도와드립니다
        </h1>
        <p className="text-sm text-blue-500">
          버튼을 누르면 바로 거래소 가입 화면으로 이동해요!
        </p>
      </div>

      {/* 거래소 아이콘 - 중앙 정렬 */}
      <div className="flex justify-center my-8">
        {exchange.logo.endsWith('.svg') || exchange.logo.endsWith('.png') ? (
          <Image 
            src={exchange.logo}
            alt={exchange.name}
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
          />
        ) : (
          <span className="font-tossface text-6xl">{exchange.logo}</span>
        )}
      </div>

      {/* 스텝 세로 표시 */}
      <div className="flex flex-col gap-1 mt-8">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0 gap-1">
            <span className="w-6 h-6 rounded-full bg-gray-600 text-gray-100 font-bold flex items-center justify-center text-[12px]">1</span>
            <div className="w-0.5 h-8 bg-gray-600 my-1"></div>
          </div>
          <p className="text-white">퀀텀시프트로 간편하게 거래소 가입하고</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0 gap-1">
            <span className="w-6 h-6 rounded-full bg-gray-600 text-gray-100 font-bold flex items-center justify-center text-[12px]">2</span>
            <div className="w-0.5 h-8 bg-gray-600 my-1"></div>
          </div>
          <p className="text-white">코인 거래를 통해 발생한 수수료가 일정 금액 쌓이면</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="w-6 h-6 rounded-full bg-gray-600 text-gray-100 font-bold flex items-center justify-center text-[12px]">3</span>
          </div>
          <p className="text-white">
            신경쓰지 않아도 항상 수수료 페이백의 {exchange.paybackRate}%를 자동으로 돌려받아요
          </p>
        </div>
      </div>

      {/* 다음 버튼 */}
      <FixedBottomButton onClick={handleSignupClick} tipMessage="다시 퀀텀시프트로 돌아와주세요!">
        3분 만에 가입하기
      </FixedBottomButton>
    </div>
  );
}
