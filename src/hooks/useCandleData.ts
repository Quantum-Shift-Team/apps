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

export const useCandleData = (
  market: string,
  interval: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["candles", market, interval],
    queryFn: async () => {
      const apiUrl = `/api/candles?interval=${interval}&market=${market}&count=200`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const result: CandleResponse = await response.json();
      return result;
    },
    enabled,
    staleTime: 30 * 1000, // 30초
    refetchInterval: 60 * 1000, // 1분마다 자동 갱신
  });
};

