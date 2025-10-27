// 업비트 API 설정
export const UPBIT_API = {
  BASE_URL: 'https://api.upbit.com/v1',
  CANDLES: {
    MINUTES: '/candles/minutes',
    DAYS: '/candles/days',
  },
  MARKET: 'KRW-BTC',
  COUNT: 200,
} as const;

// 가격 계산 설정 (%)
export const PRICE_CONFIG = {
  ENTRY_PERCENT: 0.998,      // 진입가: 현재가 -0.2%
  STOP_LOSS_PERCENT: 0.995,   // 손절가: 현재가 -0.5%
  TAKE_PROFIT_PERCENT: 1.008, // 익절가: 현재가 +0.8%
} as const;

// 가격 라인 설정
export const PRICE_LINE_CONFIG = {
  ENTRY: {
    color: '#2196f3',
    lineWidth: 2,
    lineStyle: 2, // 점선
    axisLabelVisible: true,
  },
  STOP_LOSS: {
    color: '#ef5350',
    lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
  },
  TAKE_PROFIT: {
    color: '#26a69a',
    lineWidth: 2,
    lineStyle: 2,
    axisLabelVisible: true,
  },
} as const;

// 가격 계산 함수
export const calculatePrice = (currentPrice: number) => {
  return {
    entry: currentPrice * PRICE_CONFIG.ENTRY_PERCENT,
    stopLoss: currentPrice * PRICE_CONFIG.STOP_LOSS_PERCENT,
    takeProfit: currentPrice * PRICE_CONFIG.TAKE_PROFIT_PERCENT,
  };
};
