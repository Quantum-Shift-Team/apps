// 가격 계산 설정 타입
export interface PriceConfig {
  entryPercent: number;      // 진입가 비율
  stopLossPercent: number;   // 손절가 비율
  takeProfitPercent: number; // 익절가 비율
}

// 암호화폐 정보 설정
export interface CryptoInfo {
  code: string;              // 업비트 코드 (예: KRW-BTC)
  usdtCode: string;          // USDT 코드 (예: USDT-BTC)
  name: string;              // 한글명
  symbol: string;             // 차트 심볼 (예: BTC/KRW)
  priceConfig: PriceConfig;   // 가격 설정
}

export const CRYPTO_CURRENCIES: Record<string, CryptoInfo> = {
  BTC: {
    code: 'KRW-BTC',
    usdtCode: 'USDT-BTC',
    name: '비트코인',
    symbol: 'BTC/KRW',
    priceConfig: {
      entryPercent: 0.998,      // 진입가: 현재가 -0.2%
      stopLossPercent: 0.995,   // 손절가: 현재가 -0.5%
      takeProfitPercent: 1.008, // 익절가: 현재가 +0.8%
    },
  },
  SOL: {
    code: 'KRW-SOL',
    usdtCode: 'USDT-SOL',
    name: '솔라나',
    symbol: 'SOL/KRW',
    priceConfig: {
      entryPercent: 0.999,      // 진입가: 현재가 -0.1%
      stopLossPercent: 0.997,   // 손절가: 현재가 -0.3%
      takeProfitPercent: 1.012, // 익절가: 현재가 +1.2%
    },
  },
  ETH: {
    code: 'KRW-ETH',
    usdtCode: 'USDT-ETH',
    name: '이더리움',
    symbol: 'ETH/KRW',
    priceConfig: {
      entryPercent: 0.9985,     // 진입가: 현재가 -0.15%
      stopLossPercent: 0.996,   // 손절가: 현재가 -0.4%
      takeProfitPercent: 1.010, // 익절가: 현재가 +1.0%
    },
  },
  DOGE: {
    code: 'KRW-DOGE',
    usdtCode: 'USDT-DOGE',
    name: '도지코인',
    symbol: 'DOGE/KRW',
    priceConfig: {
      entryPercent: 0.9995,     // 진입가: 현재가 -0.05%
      stopLossPercent: 0.998,   // 손절가: 현재가 -0.2%
      takeProfitPercent: 1.015, // 익절가: 현재가 +1.5%
    },
  },
} as const;

// 기본 선택 코인
export const DEFAULT_CRYPTO = 'BTC';

// 특정 코인 정보 가져오기
export const getCryptoInfo = (symbol: string): CryptoInfo => {
  return CRYPTO_CURRENCIES[symbol] || CRYPTO_CURRENCIES[DEFAULT_CRYPTO];
};

