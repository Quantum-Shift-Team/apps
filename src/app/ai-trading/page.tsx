"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  TimeIntervalSelector,
  LightweightChartsWidget,
} from "@/components/tradingview";
import {
  CRYPTO_CURRENCIES,
  DEFAULT_CRYPTO,
  getCryptoInfo,
} from "@/lib/cryptoConfig";

export default function AITradingPage() {
  const [selectedCrypto, setSelectedCrypto] = useState<string>(DEFAULT_CRYPTO);
  const [selectedInterval, setSelectedInterval] = useState<string>("15");
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, any>>({});
  const wsRef = useRef<WebSocket | null>(null);

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
  };

  const handlePriceUpdate = useCallback((price: number) => {
    // 차트에서 업데이트된 가격을 받을 때 사용
  }, []);

  // 모든 코인 가격을 관리하는 상태를 업데이트
  const updateCryptoPrice = (code: string, data: any) => {
    setCryptoPrices((prev) => ({
      ...prev,
      [code]: data,
    }));
  };

  // 업비트 WebSocket 연결 - 한 번만 연결하여 모든 코인 구독
  useEffect(() => {
    // 모든 코인의 티커 코드 수집
    const allCodes = Object.values(CRYPTO_CURRENCIES).flatMap((crypto) => [
      crypto.code,
      crypto.usdtCode,
    ]);

    // 단일 WebSocket 연결로 모든 코인 구독
    const ws = new WebSocket("wss://api.upbit.com/websocket/v1");

    ws.onopen = () => {
      console.log("WebSocket connected - All cryptocurrencies subscribed");
      // 모든 코인 구독
      const subscribeMessage = [
        { ticket: "test" },
        { type: "ticker", codes: allCodes },
      ];
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (data.type === "ticker") {
            updateCryptoPrice(data.code, {
              trade_price: data.trade_price,
              signed_change_price: data.signed_change_price,
              signed_change_rate: data.signed_change_rate,
            });
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };
      reader.readAsText(event.data);
    };

    ws.onerror = (error) => {
      console.warn("WebSocket connection error");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    wsRef.current = ws;

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []); // 한 번만 실행

  // 코인 정보를 가져옴
  const cryptoInfo = getCryptoInfo(selectedCrypto);

  // 현재 선택된 코인의 가격 정보
  const currentPriceData = cryptoPrices[cryptoInfo.code];
  const currentPriceUSDData = cryptoPrices[cryptoInfo.usdtCode];

  return (
    <div className="px-0 py-6 space-y-4">
      {/* 코인 선택 버튼 */}
      <div className="px-6 flex gap-2">
        {Object.keys(CRYPTO_CURRENCIES).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedCrypto(key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              selectedCrypto === key
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* 코인 정보 */}
      <div className="px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">{cryptoInfo.name}</h1>
        </div>
        {currentPriceData && (
          <div>
            <div className="flex items-center gap-1 mb-2">
              <p className="text-2xl text-white font-bold">
                {currentPriceData.trade_price.toLocaleString("ko-KR")} 원
              </p>
              {currentPriceUSDData && (
                <p className="text-sm text-gray-400">
                  $
                  {currentPriceUSDData.trade_price.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </p>
              )}
            </div>
            {currentPriceData.signed_change_price !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">지난 정규장보다 </span>
                <span
                  className={`text-sm font-semibold ${
                    currentPriceData.signed_change_price >= 0
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {currentPriceData.signed_change_price >= 0 ? "+" : ""}₩
                  {Math.abs(
                    currentPriceData.signed_change_price
                  ).toLocaleString("ko-KR")}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    currentPriceData.signed_change_price >= 0
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  ({currentPriceData.signed_change_price >= 0 ? "+" : ""}
                  {(currentPriceData.signed_change_rate * 100).toFixed(2)}%)
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 차트 */}
      <LightweightChartsWidget
        key={`${selectedCrypto}-${selectedInterval}`}
        symbol={cryptoInfo.symbol}
        theme="dark"
        interval={selectedInterval}
        locale="ko"
        onPriceUpdate={handlePriceUpdate}
      />

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
  );
}
