"use client";

import { useState, useEffect, useRef } from "react";
import { TimeIntervalSelector, LightweightChartsWidget } from "@/components/tradingview";

export default function AITradingPage() {
  const [selectedInterval, setSelectedInterval] = useState<string>('15');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [currentPriceUSD, setCurrentPriceUSD] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const usdWsRef = useRef<WebSocket | null>(null);

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
  };

  const handlePriceUpdate = (price: number) => {
    setCurrentPrice(price);
  };

  // 업비트 WebSocket 연결
  useEffect(() => {
    // KRW-BTC WebSocket 연결
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    
    ws.onopen = () => {
      // 틱 데이터 구독
      const subscribeMessage = [{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}];
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (data.type === 'ticker' && data.code === 'KRW-BTC') {
            setCurrentPrice(data.trade_price);
            setPriceChange(data.signed_change_price);
            setPriceChangePercent(data.signed_change_rate);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      reader.readAsText(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current = ws;

    // USD/BTC WebSocket 연결
    const usdWs = new WebSocket('wss://api.upbit.com/websocket/v1');
    
    usdWs.onopen = () => {
      const subscribeMessage = [{"ticket":"usd"},{"type":"ticker","codes":["USDT-BTC"]}];
      usdWs.send(JSON.stringify(subscribeMessage));
    };

    usdWs.onmessage = async (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (data.type === 'ticker' && data.code === 'USDT-BTC') {
            setCurrentPriceUSD(data.trade_price);
          }
        } catch (error) {
          console.error('Failed to parse USD WebSocket message:', error);
        }
      };
      reader.readAsText(event.data);
    };

    usdWs.onerror = (error) => {
      console.error('USD WebSocket error:', error);
    };

    usdWsRef.current = usdWs;

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (usdWsRef.current) {
        usdWsRef.current.close();
      }
    };
  }, []);



  return (
    <div className="px-0 py-6 space-y-4">
        {/* 코인 정보 */}
        <div className="px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">비트코인</h1>
          </div>
          {currentPrice !== null && (
            <div>
              <div className="flex items-center gap-1 mb-2">
                <p className="text-2xl text-white font-bold">
                  {currentPrice.toLocaleString('ko-KR')} 원
                </p>
                {currentPriceUSD !== null && (
                  <p className="text-sm text-gray-400">
                    ${currentPriceUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                )}
              </div>
              {priceChange !== null && priceChangePercent !== null && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">지난 정규장보다 </span>
                  <span className={`text-sm font-semibold ${priceChange >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                    {priceChange >= 0 ? '+' : ''}₩{Math.abs(priceChange).toLocaleString('ko-KR')}
                  </span>
                  <span className={`text-sm font-semibold ${priceChange >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                    ({priceChange >= 0 ? '+' : ''}{(priceChangePercent * 100).toFixed(2)}%)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 차트 */}
        <LightweightChartsWidget 
          symbol="BTC/KRW" 
          theme="dark" 
          interval={selectedInterval}
          locale="ko"
          targetPrice={171000000}
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
