"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, CandlestickData, Time, CandlestickSeries } from 'lightweight-charts';
import { UPBIT_API, PRICE_LINE_CONFIG, calculatePrice } from '@/lib/tradingConfig';

interface LightweightChartsWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  height?: string;
  interval?: string;
  locale?: 'ko' | 'en';
  targetPrice?: number; // 목표 가격 (수평선 표시할 가격)
  onPriceUpdate?: (price: number) => void; // 현재 가격 업데이트 콜백
}

export function LightweightChartsWidget({
  theme = "dark",
  height = "300px",
  interval = "1D",
  targetPrice,
  onPriceUpdate
}: LightweightChartsWidgetProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isMounted, setIsMounted] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

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
        background: { color: theme === 'dark' ? '#1a1a1a' : '#ffffff' },
        textColor: theme === 'dark' ? '#ffffff' : '#191919',
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#2a2a2a' : '#e0e0e0' },
        horzLines: { color: theme === 'dark' ? '#2a2a2a' : '#e0e0e0' },
      },
      rightPriceScale: {
        visible: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: false,
        textColor: theme === 'dark' ? '#ffffff' : '#191919',
        entireTextOnly: false,
        autoScale: true,
        alignLabels: true,
      },
      localization: {
        priceFormatter: (price: number) => {
          // 만원 단위로 표시
          const manWon = Math.round(price / 10000);
          return `${manWon}만`;
        },
      },
    });

    chartRef.current = chart;

    // 캔들스틱 시리즈 생성
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    
    seriesRef.current = candlestickSeries;

    // 업비트 API에서 실시간 데이터 가져오기
    const fetchCandles = async () => {
      try {
        // 분봉인지 일봉인지 판단
        const isMinuteCandle = !['D', 'W', 'M'].includes(interval);
        
        // API URL 생성
        let apiUrl = '';
        if (isMinuteCandle) {
          // 분봉 (1, 3, 5, 10, 15, 30, 60, 120, 240)
          apiUrl = `${UPBIT_API.BASE_URL}${UPBIT_API.CANDLES.MINUTES}/${interval}?market=${UPBIT_API.MARKET}&count=${UPBIT_API.COUNT}`;
        } else {
          // 일봉
          apiUrl = `${UPBIT_API.BASE_URL}${UPBIT_API.CANDLES.DAYS}?market=${UPBIT_API.MARKET}&count=${UPBIT_API.COUNT}`;
        }
        
        const response = await fetch(apiUrl);
        const upbitData = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedData: CandlestickData[] = upbitData.map((candle: any) => {
          // 분봉은 Unix timestamp로, 일봉은 날짜 문자열로
          let timeValue: Time;
          if (isMinuteCandle) {
            // 분봉: Unix timestamp (초 단위)
            const date = new Date(candle.candle_date_time_kst + '+09:00');
            timeValue = Math.floor(date.getTime() / 1000) as Time;
          } else {
            // 일봉: 날짜 문자열
            timeValue = candle.candle_date_time_kst?.replace('T', ' ').slice(0, 10) as Time;
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
          new Map(mappedData.map(item => [item.time, item])).values()
        ).sort((a, b) => {
          if (typeof a.time === 'number' && typeof b.time === 'number') {
            return a.time - b.time; // 숫자 비교 (Unix timestamp)
          }
          if (typeof a.time === 'string' && typeof b.time === 'string') {
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
          
          // 가격 계산
          const prices = calculatePrice(latestPrice);

          // 가격 라인 추가
          candlestickSeries.createPriceLine({
            price: prices.entry,
            ...PRICE_LINE_CONFIG.ENTRY,
            title: `진입가: ₩${Math.round(prices.entry).toLocaleString()}`,
          });

          candlestickSeries.createPriceLine({
            price: prices.stopLoss,
            ...PRICE_LINE_CONFIG.STOP_LOSS,
            title: `손절가: ₩${Math.round(prices.stopLoss).toLocaleString()}`,
          });

          candlestickSeries.createPriceLine({
            price: prices.takeProfit,
            ...PRICE_LINE_CONFIG.TAKE_PROFIT,
            title: `익절가: ₩${Math.round(prices.takeProfit).toLocaleString()}`,
          });
        }
      } catch (error) {
        console.error('Failed to fetch candle data:', error);
        // 실패 시 빈 데이터로 처리
        candlestickSeries.setData([]);
      }
    };

    fetchCandles();

    // 차트 크기 조정
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [isMounted, theme, height, targetPrice, interval]);

  if (!isMounted) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-800 rounded-lg"
        style={{ height, width: "100%" }}
      >
        <div className="text-gray-400">차트 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0" style={{ height, position: 'relative' }}>
      <div ref={chartContainerRef} className="w-full h-full" style={{ width: '100%', height: '100%' }} />
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
