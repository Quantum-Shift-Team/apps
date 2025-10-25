"use client";

import { useState } from "react";
import { TradingViewWidget, TimeIntervalSelector } from "@/components/tradingview";

export default function AITradingPage() {
  const [selectedInterval, setSelectedInterval] = useState<'1' | '3' | '5' | '10' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M' | 'Y'>('5');

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval as '1' | '3' | '5' | '10' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M' | 'Y');
  };

  return (
    <>
      <div className="px-0 py-6 space-y-4">
        {/* AI 트레이딩 정보 */}
        <div className="px-6">
          <p className="text-2xl font-bold text-white mb-2">
            <span className="text-green-400">AI</span>가 분석했어요
          </p>
          <p className="text-sm text-gray-400">24시간 무인 거래 &gt;</p>
        </div>

        {/* AI 트레이딩 박스 */}
        <div className="h-80 bg-gray-800 rounded-lg overflow-hidden">
          <TradingViewWidget 
            symbol="BINANCE:BTCUSDT" 
            theme="dark" 
            height="100%" 
            interval={selectedInterval}
            locale="ko"
            timezone="Asia/Seoul"
            hideSymbolInfo={true}
            hideIntervalInfo={true}
            hideCopyright={true}
          />
        </div>

        {/* 시간대 선택 버튼 */}
        <TimeIntervalSelector 
          onIntervalChange={handleIntervalChange}
          defaultInterval={selectedInterval}
        />

        {/* AI 트레이딩 특징 */}
        {/* <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">AI 트레이딩 특징</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <span className="font-tossface text-2xl">⚡</span>
              <span className="text-white">실시간 시장 분석</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <span className="font-tossface text-2xl">🎯</span>
              <span className="text-white">정확한 매매 타이밍</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <span className="font-tossface text-2xl">🛡️</span>
              <span className="text-white">리스크 관리</span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
