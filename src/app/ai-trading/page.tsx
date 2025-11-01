"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  TimeIntervalSelector,
  LightweightChartsWidget,
} from "@/components/tradingview";
import {
  CRYPTO_CURRENCIES,
  DEFAULT_CRYPTO,
  getCryptoInfo,
} from "@/lib/cryptoConfig";
import { useCandleData } from "@/hooks/useCandleData";

interface CryptoPriceData {
  trade_price: number;
  signed_change_price: number;
  signed_change_rate: number;
}

export default function AITradingPage() {
  const [selectedCrypto, setSelectedCrypto] = useState<string>(DEFAULT_CRYPTO);
  const [selectedInterval, setSelectedInterval] = useState<string>("15");
  const [cryptoPrices, setCryptoPrices] = useState<
    Record<string, CryptoPriceData>
  >({});
  const [dataTimestamp, setDataTimestamp] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  // 코인 정보를 가져옴
  const cryptoInfo = getCryptoInfo(selectedCrypto);
  
  // 현재 선택된 코인의 캔들 데이터와 분석 데이터
  const { data: combinedData } = useCandleData(
    cryptoInfo.code,
    selectedInterval,
    true
  );

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);

    // 선택한 시간대의 모든 코인 데이터 프리패치
    const fetchCombinedData = async (market: string, interval: string) => {
      // 캔들 데이터 가져오기
      const candleApiUrl = `/api/candles?interval=${interval}&market=${market}&count=200`;
      const candleResponse = await fetch(candleApiUrl).then((res) => res.json());

      // 분석 데이터 가져오기
      let analyzeResult = null;
      try {
        const analyzeApiUrl = `/api/trading/analyze`;
        const analyzeResponse = await fetch(analyzeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            market,
            interval: parseInt(interval) || 15,
            hours: 12,
          }),
        });

        if (analyzeResponse.ok) {
          const analyzeData = await analyzeResponse.json();
          if (analyzeData && Object.keys(analyzeData).length > 0) {
            analyzeResult = analyzeData;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch analyze data:', error);
      }

      return {
        candleData: candleResponse,
        analyzeData: analyzeResult,
      };
    };

    // 모든 코인에 대해 선택된 시간대 데이터 prefetch
    Object.values(CRYPTO_CURRENCIES).forEach((crypto) => {
      queryClient.prefetchQuery({
        queryKey: ["candles", crypto.code, interval],
        queryFn: () => fetchCombinedData(crypto.code, interval),
        staleTime: 30 * 1000,
      });
    });
  };

  const handlePriceUpdate = useCallback(() => {
    // 차트에서 업데이트된 가격을 받을 때 사용
  }, []);

  const handleTimestampUpdate = useCallback((timestamp: number) => {
    setDataTimestamp(timestamp);
  }, []);

  // 모든 코인 가격을 관리하는 상태를 업데이트
  const updateCryptoPrice = (code: string, data: CryptoPriceData) => {
    setCryptoPrices((prev) => ({
      ...prev,
      [code]: data,
    }));
  };

  // 페이지 진입 시 데이터 프리패치
  useEffect(() => {
    const fetchCombinedData = async (market: string, interval: string) => {
      // 캔들 데이터 가져오기
      const candleApiUrl = `/api/candles?interval=${interval}&market=${market}&count=200`;
      const candleResponse = await fetch(candleApiUrl).then((res) => res.json());

      // 분석 데이터 가져오기
      let analyzeResult = null;
      try {
        const analyzeApiUrl = `/api/trading/analyze`;
        const analyzeResponse = await fetch(analyzeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            market,
            interval: parseInt(interval) || 15,
            hours: 12,
          }),
        });

        if (analyzeResponse.ok) {
          const analyzeData = await analyzeResponse.json();
          if (analyzeData && Object.keys(analyzeData).length > 0) {
            analyzeResult = analyzeData;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch analyze data:', error);
      }

      return {
        candleData: candleResponse,
        analyzeData: analyzeResult,
      };
    };

    const prefetchData = async () => {
      // 모든 시간대 배열
      const intervals = ["1", "3", "5", "15", "30", "60", "240", "D"];

      // BTC - 모든 시간대 prefetch
      for (const interval of intervals) {
        queryClient.prefetchQuery({
          queryKey: ["candles", "KRW-BTC", interval],
          queryFn: () => fetchCombinedData("KRW-BTC", interval),
          staleTime: 30 * 1000,
        });
      }

      // 다른 코인들 - 15분봉만 prefetch
      const otherCoins = ["SOL", "ETH", "DOGE"];
      for (const coin of otherCoins) {
        const crypto = CRYPTO_CURRENCIES[coin];
        if (crypto) {
          queryClient.prefetchQuery({
            queryKey: ["candles", crypto.code, "15"],
            queryFn: () => fetchCombinedData(crypto.code, "15"),
            staleTime: 30 * 1000,
          });
        }
      }
    };

    prefetchData();
  }, [queryClient]);

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

    ws.onerror = () => {
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

  // 현재 선택된 코인의 가격 정보
  const currentPriceData = cryptoPrices[cryptoInfo.code];
  const currentPriceUSDData = cryptoPrices[cryptoInfo.usdtCode];
  
  // 분석 데이터 추출
  const analyzeData = combinedData?.analyzeData;

  return (
    <div className="px-0 py-6 space-y-4">
      {/* 코인 선택 버튼 */}
      <div className="px-6 flex gap-1.5">
        {Object.keys(CRYPTO_CURRENCIES).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedCrypto(key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
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
          {dataTimestamp && (
            <span className="text-xs text-gray-500">
              데이터:{" "}
              {new Date(dataTimestamp).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          )}
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
        onTimestampUpdate={handleTimestampUpdate}
      />

      {/* 시간대 선택 버튼 */}
      <TimeIntervalSelector
        onIntervalChange={handleIntervalChange}
        defaultInterval={selectedInterval}
      />

      {/* AI 분석 결과 */}
      {analyzeData && (
        <div className="px-6 space-y-4">
          <div className="border-b border-gray-700 pb-2">
            <h3 className="text-lg font-semibold text-white">AI 분석 결과</h3>
          </div>

          {/* 매매 신호 */}
          {analyzeData.trading_signals && (
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">매매 신호</h4>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(analyzeData.trading_signals).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{key}:</span>
                    <span className="text-sm font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 기술적 지표 요약 */}
          {analyzeData.technical_indicators && (
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">주요 지표</h4>
              <div className="grid grid-cols-2 gap-2">
                {analyzeData.technical_indicators.rsi && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">RSI:</span>
                    <span className="text-xs font-medium text-white">
                      {analyzeData.technical_indicators.rsi.toFixed(2)}
                    </span>
                  </div>
                )}
                {analyzeData.technical_indicators.macd && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">MACD:</span>
                    <span className="text-xs font-medium text-white">
                      {analyzeData.technical_indicators.macd.toFixed(2)}
                    </span>
                  </div>
                )}
                {analyzeData.technical_indicators.adx && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">ADX:</span>
                    <span className="text-xs font-medium text-white">
                      {analyzeData.technical_indicators.adx.toFixed(2)}
                    </span>
                  </div>
                )}
                {analyzeData.technical_indicators.atr && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">ATR:</span>
                    <span className="text-xs font-medium text-white">
                      {Math.round(analyzeData.technical_indicators.atr).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 상세 분석 리포트 */}
          {analyzeData.analysis_report && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-400 mb-3">상세 분석</h4>
              <div className="text-gray-300 text-sm max-h-96 overflow-y-auto leading-relaxed">
                {analyzeData.analysis_report.split('\n').map((line, idx) => {
                  const trimmedLine = line.trim();
                  
                  // 빈 줄
                  if (!trimmedLine) {
                    return <div key={idx} className="h-2" />;
                  }
                  
                  // H1 제목
                  if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('##')) {
                    const text = trimmedLine.replace('# ', '');
                    return (
                      <h1 key={idx} className="text-2xl font-bold text-blue-300 mb-3 mt-4 first:mt-0">
                        {text}
                      </h1>
                    );
                  }
                  
                  // H2 제목
                  if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('###')) {
                    const text = trimmedLine.replace('## ', '');
                    return (
                      <h2 key={idx} className="text-xl font-bold text-cyan-400 mb-2 mt-3">
                        {text}
                      </h2>
                    );
                  }
                  
                  // H3 제목
                  if (trimmedLine.startsWith('### ')) {
                    const text = trimmedLine.replace('### ', '');
                    return (
                      <h3 key={idx} className="text-base font-semibold text-green-400 mb-2 mt-2">
                        {text}
                      </h3>
                    );
                  }
                  
                  // 구분선
                  if (trimmedLine === '---') {
                    return <hr key={idx} className="my-3 border-gray-600" />;
                  }
                  
                  // 리스트 항목
                  if (trimmedLine.startsWith('- ')) {
                    const text = trimmedLine.replace('- ', '');
                    return (
                      <div key={idx} className="flex items-start mb-1 pl-2">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-gray-200 flex-1">
                          {text.split('**').map((part, partIdx) => 
                            partIdx % 2 === 1 ? (
                              <strong key={partIdx} className="text-white font-semibold">
                                {part}
                              </strong>
                            ) : (
                              <span key={partIdx}>{part}</span>
                            )
                          )}
                        </span>
                      </div>
                    );
                  }
                  
                  // 일반 문단
                  return (
                    <p key={idx} className="text-gray-200 mb-2">
                      {line.split('**').map((part, partIdx) => 
                        partIdx % 2 === 1 ? (
                          <strong key={partIdx} className="text-blue-300 font-semibold">
                            {part}
                          </strong>
                        ) : (
                          <span key={partIdx}>{part}</span>
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
