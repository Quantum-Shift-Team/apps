"use client";

import React, { useEffect, useRef, memo, useState } from 'react';

// TradingView 타입 선언
declare global {
  interface Window {
    TradingView: {
      widget: (options: Record<string, unknown>) => unknown;
    };
  }
}

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  height?: string;
  interval?: '1' | '3' | '5' | '10' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M' | 'Y';
  locale?: 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ar' | 'hi' | 'th' | 'vi' | 'tr';
  timezone?: string;
  hideSymbolInfo?: boolean;
  hideIntervalInfo?: boolean;
  hideCopyright?: boolean;
  entryPrice?: number;
}

function TradingViewWidget({ 
  symbol = "BINANCE:BTCUSDT", 
  theme = "dark",
  height = "100%",
  interval = "D",
  locale = "ko",
  timezone = "Asia/Seoul",
  hideSymbolInfo = true,
  hideIntervalInfo = true,
  hideCopyright = true,
  entryPrice = 111371
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 진입가 기준으로 손절가(-3%)와 익절가(+5%) 계산
  const stopLossPrice = entryPrice * 0.97; // -3%
  const takeProfitPrice = entryPrice * 1.05; // +5%

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const currentContainer = container.current;
    if (!currentContainer) return;

    // 고유한 ID 생성
    currentContainer.id = `tradingview-${Date.now()}`;
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    
    script.onload = () => {
      if (window.TradingView && currentContainer) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window.TradingView as any).widget({
          container_id: currentContainer.id,
          width: "100%",
          height: height === "100%" ? 400 : parseInt(height),
          symbol: symbol,
          interval: interval,
          timezone: timezone,
          theme: theme,
          style: "1",
          locale: locale,
          toolbar_bg: theme === "dark" ? "#1a1a1a" : "#ffffff",
          enable_publishing: false,
          hide_top_toolbar: hideSymbolInfo && hideIntervalInfo,
          hide_legend: false,
          save_image: false,
          studies: [],
          drawings_access: {
            type: "black",
            tools: [
              {
                name: "LineToolHorizontalLine",
                grayed: false
              }
            ]
          },
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load TradingView script');
    };

    currentContainer.appendChild(script);

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [isMounted, symbol, theme, interval, locale, timezone, hideSymbolInfo, hideIntervalInfo, height]);

  // 클라이언트 사이드에서만 렌더링하여 hydration 오류 방지
  if (!isMounted) {
    return (
      <div 
        className="tradingview-widget-container" 
        style={{ height, width: "100%" }}
      >
        <div 
          className="flex items-center justify-center bg-gray-800 rounded-lg"
          style={{ height: hideCopyright ? "100%" : "calc(100% - 32px)", width: "100%" }}
        >
          <div className="text-gray-400">차트 로딩 중...</div>
        </div>
        {!hideCopyright && (
          <div className="tradingview-widget-copyright">
            <a 
              href={`https://www.tradingview.com/symbols/${symbol.replace(':', '-')}/`} 
              rel="noopener nofollow" 
              target="_blank"
            >
              <span className="blue-text">{symbol} chart</span>
            </a>
            <span className="trademark"> by TradingView</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="tradingview-widget-container" 
      style={{ height, width: "100%" }}
    >
      <div 
        ref={container}
        className="tradingview-widget-container__widget" 
        style={{ height: hideCopyright ? "100%" : "calc(100% - 32px)", width: "100%" }}
      />
      {!hideCopyright && (
        <div className="tradingview-widget-copyright">
          <a 
            href={`https://www.tradingview.com/symbols/${symbol.replace(':', '-')}/`} 
            rel="noopener nofollow" 
            target="_blank"
          >
            <span className="blue-text">{symbol} chart</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      )}
    </div>
  );
}

export default memo(TradingViewWidget);
