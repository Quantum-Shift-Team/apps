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
}

export function LightweightChartsWidget({
  symbol,
  theme = "dark",
  height = "300px",
  interval = "1D",
  onPriceUpdate,
}: LightweightChartsWidgetProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isMounted, setIsMounted] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

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
  const { data: upbitData, isLoading } = useCandleData(
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
      if (!upbitData || isLoading) return;

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
          setCurrentPrice(latestPrice);

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
    upbitData,
    isLoading,
    market,
  ]);

  if (!isMounted) {
    return null;
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
