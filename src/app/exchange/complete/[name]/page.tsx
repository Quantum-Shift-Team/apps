"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";
import Image from "next/image";

interface ExchangeCompletePageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeCompletePage({
  params,
}: ExchangeCompletePageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12">
        {/* 성공 아이콘 */}
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-white mb-3 text-center">
          가입이 완료되었습니다! 🎉
        </h1>

        {/* 거래소 로고 */}
        <div className="my-6">
          {exchange.logo.endsWith(".svg") || exchange.logo.endsWith(".png") ? (
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

        {/* 환급 안내 카드 */}
        <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  수수료 환급 받기
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  거래 수수료의{" "}
                  <span className="text-blue-400 font-bold">
                    {exchange.paybackRate}%
                  </span>
                  를 환급받으시려면 마이페이지에서 거래소 UID를 입력해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 안내 문구 */}
        <p className="text-sm text-gray-400 text-center mb-8">
          거래를 시작하고 수수료 환급을 받아보세요!
        </p>
      </div>

      <FixedBottomButton href="/mypage" bgOpacity={90}>
        마이페이지로 이동
      </FixedBottomButton>
    </>
  );
}
