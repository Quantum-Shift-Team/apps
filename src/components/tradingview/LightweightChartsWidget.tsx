"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  CandlestickData,
  Time,
  CandlestickSeries,
} from "lightweight-charts";
import { PRICE_LINE_CONFIG } from "@/lib/tradingConfig";
import { CRYPTO_CURRENCIES } from "@/lib/cryptoConfig";
import { useCandleData } from "@/hooks/useCandleData";

interface LightweightChartsWidgetProps {
  symbol?: string;
  theme?: "light" | "dark";
  height?: string;
  interval?: string;
  locale?: "ko" | "en";
  onPriceUpdate?: (price: number) => void; // 현재 가격 업데이트 콜백
  onTimestampUpdate?: (timestamp: number) => void; // 데이터 타임스탬프 업데이트
}

export function LightweightChartsWidget({
  symbol,
  theme = "dark",
  height = "300px",
  interval = "1D",
  onPriceUpdate,
  onTimestampUpdate,
}: LightweightChartsWidgetProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isMounted, setIsMounted] = useState(false);

  // symbol을 market 형식으로 변환: "BTC/KRW" -> "KRW-BTC"
  const getMarketFromSymbol = (sym?: string) => {
    if (!sym) return "KRW-BTC"; // 기본값
    const [coin, currency] = sym.split("/");
    return `${currency}-${coin}`;
  };

  // symbol에서 코인 이름 추출: "BTC/KRW" -> "BTC"
  const getCoinFromSymbol = (sym?: string) => {
    if (!sym) return "";
    return sym.split("/")[0];
  };

  // symbol을 market으로 변환: "BTC/KRW" -> "KRW-BTC"
  const market = getMarketFromSymbol(symbol);

  // useQuery로 차트 데이터 가져오기
  const { data: candleResponse, isLoading } = useCandleData(
    market,
    interval,
    isMounted
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !chartContainerRef.current) return;

    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: parseInt(height) || 400,
      layout: {
        background: { color: theme === "dark" ? "#1a1a1a" : "#ffffff" },
        textColor: theme === "dark" ? "#ffffff" : "#191919",
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#2a2a2a" : "#e0e0e0" },
        horzLines: { color: theme === "dark" ? "#2a2a2a" : "#e0e0e0" },
      },
      rightPriceScale: {
        visible: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: false,
        textColor: theme === "dark" ? "#ffffff" : "#191919",
        entireTextOnly: false,
        autoScale: true,
        alignLabels: true,
      },
      localization: {
        priceFormatter: (price: number) => {
          const coin = getCoinFromSymbol(symbol);
          // BTC, ETH만 만원 단위로 표시, 나머지는 전체 가격 표시
          if (coin === "BTC" || coin === "ETH") {
            const manWon = Math.round(price / 10000);
            return `${manWon}만`;
          }
          // 다른 코인들은 전체 가격 표시
          return price.toLocaleString();
        },
      },
    });

    chartRef.current = chart;

    // 캔들스틱 시리즈 생성
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    seriesRef.current = candlestickSeries;

    // 데이터 처리 함수
    const processCandleData = () => {
      if (!candleResponse || isLoading) return;

      const upbitData = candleResponse.data;

      // 타임스탬프 부모에게 전달
      if (onTimestampUpdate && candleResponse.timestamp) {
        onTimestampUpdate(candleResponse.timestamp);
      }

      try {
        // 분봉인지 일봉인지 판단
        const isMinuteCandle = !["D", "W", "M"].includes(interval);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedData: CandlestickData[] = upbitData.map((candle: any) => {
          // 분봉은 Unix timestamp로, 일봉은 날짜 문자열로
          let timeValue: Time;
          if (isMinuteCandle) {
            // 분봉: Unix timestamp (초 단위)
            const date = new Date(candle.candle_date_time_kst + "+09:00");
            timeValue = Math.floor(date.getTime() / 1000) as Time;
          } else {
            // 일봉: 날짜 문자열
            timeValue = candle.candle_date_time_kst
              ?.replace("T", " ")
              .slice(0, 10) as Time;
          }

          return {
            time: timeValue,
            open: candle.opening_price,
            high: candle.high_price,
            low: candle.low_price,
            close: candle.trade_price,
          };
        });

        // 중복 제거 및 시간순 정렬 (오름차순)
        const uniqueData = Array.from(
          new Map(mappedData.map((item) => [item.time, item])).values()
        ).sort((a, b) => {
          if (typeof a.time === "number" && typeof b.time === "number") {
            return a.time - b.time; // 숫자 비교 (Unix timestamp)
          }
          if (typeof a.time === "string" && typeof b.time === "string") {
            return a.time.localeCompare(b.time);
          }
          return 0;
        });

        candlestickSeries.setData(uniqueData);

        // 현재 가격 가져오기 (가장 최근 종가)
        if (uniqueData.length > 0) {
          const latestPrice = uniqueData[uniqueData.length - 1].close;

          // 부모 컴포넌트에 현재 가격 전달
          if (onPriceUpdate) {
            onPriceUpdate(latestPrice);
          }

          // 가격 계산 (코인별 설정 사용)
          const coin = getCoinFromSymbol(symbol);
          const priceConfig = CRYPTO_CURRENCIES[coin]?.priceConfig || {
            entryPercent: 0.998,
            stopLossPercent: 0.995,
            takeProfitPercent: 1.008,
          };

          const prices = {
            entry: latestPrice * priceConfig.entryPercent,
            stopLoss: latestPrice * priceConfig.stopLossPercent,
            takeProfit: latestPrice * priceConfig.takeProfitPercent,
          };

          // 가격 포맷팅 함수
          const formatPriceLine = (price: number) => {
            if (coin === "BTC" || coin === "ETH") {
              const manWon = Math.round(price / 10000);
              return `₩${manWon}만`;
            }
            return `₩${Math.round(price).toLocaleString()}`;
          };

          // 가격 라인 추가
          candlestickSeries.createPriceLine({
            price: prices.entry,
            ...PRICE_LINE_CONFIG.ENTRY,
            title: `진입가: ${formatPriceLine(prices.entry)}`,
          });

          candlestickSeries.createPriceLine({
            price: prices.stopLoss,
            ...PRICE_LINE_CONFIG.STOP_LOSS,
            title: `손절가: ${formatPriceLine(prices.stopLoss)}`,
          });

          candlestickSeries.createPriceLine({
            price: prices.takeProfit,
            ...PRICE_LINE_CONFIG.TAKE_PROFIT,
            title: `익절가: ${formatPriceLine(prices.takeProfit)}`,
          });
        }
      } catch (error) {
        console.error("Failed to process candle data:", error);
        // 실패 시 빈 데이터로 처리
        candlestickSeries.setData([]);
      }
    };

    // 데이터가 있으면 처리
    processCandleData();

    // 차트 크기 조정
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        try {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        } catch (error) {
          console.error("Error resizing chart:", error);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      try {
        if (chartRef.current) {
          chartRef.current.remove();
        }
      } catch (error) {
        console.error("Error removing chart:", error);
      }
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [
    isMounted,
    theme,
    height,
    interval,
    symbol,
    onPriceUpdate,
    onTimestampUpdate,
    candleResponse,
    isLoading,
    market,
  ]);

  // 로딩 placeholder 컴포넌트
  const ChartSkeleton = () => {
    const shimmerStyle = {
      background:
        "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
    };

    return (
      <div
        className="w-full bg-gray-900 rounded-lg overflow-hidden"
        style={{ height, minHeight: height }}
      >
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>

        {/* 차트 헤더 */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="h-4 rounded w-32 shimmer" style={shimmerStyle}></div>
          <div className="h-4 rounded w-24 shimmer" style={shimmerStyle}></div>
        </div>

        {/* 차트 영역 - 캔들스틱 패턴 */}
        <div className="relative h-full px-4 py-6">
          {/* Y축 가격 */}
          <div className="absolute right-4 top-0 space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 rounded w-16 shimmer"
                style={{ ...shimmerStyle, animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* X축 시간 */}
          <div className="absolute bottom-0 left-4 right-4 flex justify-between">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-2 rounded w-12 shimmer"
                style={{ ...shimmerStyle, animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>

          {/* 캔들스틱 차트 영역 */}
          <div className="h-full flex items-center justify-around py-8">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const randomHeight = Math.random() * 30 + 20;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  {/* 위심 (wick) */}
                  <div
                    className="h-4 w-px shimmer"
                    style={{ ...shimmerStyle, animationDelay: `${i * 0.05}s` }}
                  ></div>
                  {/* 몸통 (body) - 높이가 랜덤하게 */}
                  <div
                    className="w-12 shimmer border border-gray-600/20"
                    style={{
                      height: `${randomHeight}%`,
                      animationDelay: `${i * 0.05}s`,
                      background:
                        "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)",
                    }}
                  ></div>
                  {/* 아래심 (wick) */}
                  <div
                    className="h-4 w-px shimmer"
                    style={{ ...shimmerStyle, animationDelay: `${i * 0.05}s` }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!isMounted || isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="w-full min-w-0" style={{ height, position: "relative" }}>
      <div
        ref={chartContainerRef}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      <style jsx global>{`
        .tv-lightweight-charts {
          right: 0 !important;
        }
        .tv-lightweight-charts__pane {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
}
