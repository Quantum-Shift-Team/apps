"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";

interface ExchangeNewPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangeNewPage({ params }: ExchangeNewPageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  return (
    <div className="px-6 py-6 space-y-8">
      {/* 상단 헤더 */}
      <div className="flex items-end gap-3 mb-3">
        {exchange.logo.endsWith('.svg') || exchange.logo.endsWith('.png') ? (
          <Image 
            src={exchange.logo}
            alt={exchange.name}
            width={48}
            height={48}
            className={exchange.logoSize}
          />
        ) : (
          <span className={`font-tossface ${exchange.logoSize}`}>{exchange.logo}</span>
        )}
        <div className="flex items-end gap-2">
          <h1 className="text-2xl font-bold text-white leading-none">{exchange.name}</h1>
          <p className="text-sm text-gray-400 leading-none">가입하기</p>
        </div>
      </div>

      {/* 가입 단계 안내 */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            {exchange.name} 가입 단계
          </h2>
          <p className="text-gray-400">
            아래 단계를 따라 가입하시면 페이백 혜택을 받을 수 있습니다
          </p>
        </div>

        {/* 단계별 안내 */}
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold">거래소 회원가입</h3>
                <p className="text-gray-400 text-sm">공식 사이트에서 회원가입을 진행하세요</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold">본인인증 완료</h3>
                <p className="text-gray-400 text-sm">KYC 인증을 완료하여 거래 권한을 획득하세요</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold">페이백 등록</h3>
                <p className="text-gray-400 text-sm">가입 완료 후 페이백 등록을 진행하세요</p>
              </div>
            </div>
          </div>
        </div>

        {/* 가입 버튼 */}
        <div className="text-center pt-4">
          <button className="w-full py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-lg">
            {exchange.name} 공식 사이트에서 가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
