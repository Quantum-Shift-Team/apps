"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";

interface ExchangePageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangePage({ params }: ExchangePageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  return (
    <>
      <div className="px-6 py-6 space-y-8">
        {/* 상단 헤더 */}
        <div className="flex items-center gap-1 mb-3">
          {exchange.logo.endsWith('.svg') ? (
            <Image 
              src={exchange.logo}
              alt={exchange.name}
              width={48}
              height={48}
              className="w-8 h-8"
            />
          ) : (
            <span className="font-tossface text-2xl">{exchange.logo}</span>
          )}
          <h1 className="text-2xl font-bold text-white">{exchange.name}</h1>
          <p className="text-gray-400">에서 거래하면</p>
        </div>

        {/* 페이백 정보 */}
        <div>
          <p className="text-xl font-bold text-white mb-2">
            전체 수수료 중 <span className="text-blue-400">{exchange.paybackRate}%</span>를 돌려 받아요
          </p>
          <p className="text-sm text-gray-400">페이백 받는 시간 &gt;</p>
        </div>

        {/* 토스 3D 아이콘 영역 */}
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            {/* 토스 3D 아이콘 배경 */}
            <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
                <span className="font-tossface text-6xl">💰</span>
              </div>
            </div>
            {/* 주변 효과 */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <button className="w-[90%] py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
              거래소 가입하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
