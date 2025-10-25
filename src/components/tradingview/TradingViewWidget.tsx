"use client";

import React, { useEffect, useRef, memo, useState } from 'react';

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
  hideCopyright = true
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const currentContainer = container.current;
    if (!currentContainer) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "allow_symbol_change": false,
      "calendar": false,
      "details": false,
      "hide_side_toolbar": true,
      "hide_top_toolbar": hideSymbolInfo && hideIntervalInfo,
      "hide_legend": false,
      "hide_volume": false,
      "hotlist": false,
      "interval": interval,
      "locale": locale,
      "save_image": false,
      "style": "1",
      "symbol": symbol,
      "theme": theme,
      "timezone": timezone,
      "backgroundColor": theme === "dark" ? "#1a1a1a" : "#ffffff",
      "gridColor": theme === "dark" ? "rgba(46, 46, 46, 0.06)" : "rgba(46, 46, 46, 0.06)",
      "watchlist": [],
      "withdateranges": false,
      "compareSymbols": [],
      "studies": [],
      "autosize": true,
      "hide_symbol_search": hideSymbolInfo,
      "hide_interval_tabs": hideIntervalInfo,
      "hide_date_ranges": true,
      "hide_market_status": true
    });

    currentContainer.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 정리
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [isMounted, symbol, theme, interval, locale, timezone, hideSymbolInfo, hideIntervalInfo]);

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
      ref={container} 
      style={{ height, width: "100%" }}
    >
      <div 
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
