"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";
import { useState } from "react";
import {
  isInstagramInAppBrowser,
  openInExternalBrowser,
} from "@/lib/browser-utils";

interface ExchangeNewPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeNewPage({ params }: ExchangeNewPageProps) {
  const { name } = use(params);
  const router = useRouter();
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  const handleSignupClick = () => {
    if (exchange.referralUrl && exchange.referralUrl.startsWith("http")) {
      const isInAppBrowser = isInstagramInAppBrowser();

      if (isInAppBrowser) {
        // 인앱 브라우저인 경우 외부 브라우저로 열기 시도
        openInExternalBrowser(exchange.referralUrl);

        // 링크 복사 안내 메시지 표시
        setShowCopyMessage(true);
        setTimeout(() => setShowCopyMessage(false), 5000);

        // 링크를 클립보드에 복사
        if (navigator.clipboard) {
          navigator.clipboard.writeText(exchange.referralUrl);
        }
      } else {
        // 일반 브라우저인 경우 새 탭에서 열기
        window.open(exchange.referralUrl, "_blank", "noopener,noreferrer");
      }
    }
    // OKX 거래소일 때는 general 페이지로, 그 외는 signup 페이지로 이동
    if (exchange.id === "okx") {
      router.push(`/exchange/general/${exchange.id}`);
    } else {
      router.push(`/exchange/signup/${exchange.id}`);
    }
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

      {/* 스텝 세로 표시 */}
      <div className="flex flex-col gap-1 mt-8">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0 gap-1">
            <span className="w-6 h-6 rounded-full bg-gray-600 text-gray-100 font-bold flex items-center justify-center text-[12px]">
              1
            </span>
            <div className="w-0.5 h-8 bg-gray-600 my-1"></div>
          </div>
          <p className="text-white">퀀텀시프트로 간편하게 거래소 가입하고</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0 gap-1">
            <span className="w-6 h-6 rounded-full bg-gray-600 text-gray-100 font-bold flex items-center justify-center text-[12px]">
              2
            </span>
            <div className="w-0.5 h-8 bg-gray-600 my-1"></div>
          </div>
          <p className="text-white">
            코인 거래를 통해 발생한 수수료가 일정 금액 쌓이면
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="w-6 h-6 rounded-full bg-gray-600 text-gray-100 font-bold flex items-center justify-center text-[12px]">
              3
            </span>
          </div>
          <p className="text-white">
            신경쓰지 않아도 항상 수수료 페이백의 {exchange.paybackRate}%를
            자동으로 돌려받아요
          </p>
        </div>
      </div>

      {/* 인스타그램 인앱 브라우저 안내 메시지 */}
      {showCopyMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-[90%] animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">외부 브라우저로 열어주세요</p>
            <p className="text-xs text-blue-100">
              링크가 클립보드에 복사되었어요.
              <br />
              사파리나 크롬 같은 외부 브라우저에서 붙여넣기 해주세요!
            </p>
          </div>
        </div>
      )}

      {/* 다음 버튼 */}
      <FixedBottomButton
        onClick={handleSignupClick}
        tipMessage="다시 퀀텀시프트로 돌아와주세요!"
      >
        3분 만에 가입하기
      </FixedBottomButton>
    </div>
  );
}
