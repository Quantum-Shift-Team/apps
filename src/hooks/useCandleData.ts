import { useQuery } from "@tanstack/react-query";

interface CandleData {
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}

interface CandleResponse {
  data: CandleData[];
  timestamp: number;
  cached: boolean;
}

interface AnalyzeResponse {
  market: string;
  interval: number;
  hours: number;
  current_price: number;
  lowest_price: number;
  highest_price: number;
  analysis_report?: string;
  technical_indicators?: Record<string, number>;
  trading_signals?: Record<string, string>;
}

interface CombinedResponse {
  candleData: CandleResponse;
  analyzeData: AnalyzeResponse | null;
}

export const useCandleData = (
  market: string,
  interval: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["candles", market, interval],
    queryFn: async () => {
      // 캔들 데이터 가져오기
      const candleApiUrl = `/api/candles?interval=${interval}&market=${market}&count=200`;
      
      const candleResponse = await fetch(candleApiUrl);
      
      if (!candleResponse.ok) {
        throw new Error(`Failed to fetch: ${candleResponse.status}`);
      }
      
      const candleResult: CandleResponse = await candleResponse.json();

      // 분석 데이터 가져오기
      let analyzeResult: AnalyzeResponse | null = null;
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
          const analyzeData: AnalyzeResponse = await analyzeResponse.json();
          // 빈 객체가 아니면 분석 데이터 사용
          if (analyzeData && Object.keys(analyzeData).length > 0) {
            analyzeResult = analyzeData;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch analyze data:', error);
        // 분석 데이터 실패는 무시하고 캔들 데이터만 반환
      }

      return {
        candleData: candleResult,
        analyzeData: analyzeResult,
      } as CombinedResponse;
    },
    enabled,
    staleTime: 30 * 1000, // 30초
    refetchInterval: 60 * 1000, // 1분마다 자동 갱신
  });
};

