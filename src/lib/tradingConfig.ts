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