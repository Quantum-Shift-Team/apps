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
  dataTime?: string; // 데이터 기준 시점 (정시)
}

export interface AnalyzeResponse {
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
      // 현재 시점에서 분과 초 제거 (정시 기준)
      const now = new Date();
      
      // 00분~05분 사이면 이전 시각으로 요청
      if (now.getMinutes() >= 0 && now.getMinutes() < 5) {
        now.setHours(now.getHours() - 1);
      }
      
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      const toTime = now.toISOString();
      
      // 캔들 데이터 가져오기
      const candleApiUrl = `/api/candles?interval=${interval}&market=${market}&count=200&to=${toTime}`;
      
      const candleResponse = await fetch(candleApiUrl);
      
      if (!candleResponse.ok) {
        throw new Error(`Failed to fetch: ${candleResponse.status}`);
      }
      
      const candleResult: CandleResponse = await candleResponse.json();

      return {
        candleData: candleResult,
        analyzeData: null,
      } as CombinedResponse;
    },
    enabled,
    staleTime: 30 * 1000, // 30초
    refetchInterval: 60 * 1000, // 1분마다 자동 갱신
  });
};

