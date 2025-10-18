"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";

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
    <div className="px-6 py-6 space-y-6">
      {/* 거래소 헤더 */}
      <div className="flex items-center gap-4">
        <div className="aspect-square h-16 rounded-lg bg-gray-700 flex items-center justify-center">
          <span className="font-tossface text-4xl">{exchange.logo}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{exchange.name}</h1>
          <p className="text-gray-400">{exchange.description}</p>
        </div>
      </div>

      {/* 페이백 정보 카드 */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">페이백 정보</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{exchange.paybackRate}%</p>
            <p className="text-sm text-gray-400">페이백 비율</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">수수료율</p>
            <p className="text-lg font-semibold text-white">
              지정가 {exchange.makerFee}% / 시장가 {exchange.takerFee}%
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
