// 암호화폐 정보 설정
export interface CryptoInfo {
  code: string;              // 업비트 코드 (예: KRW-BTC)
  usdtCode: string;          // USDT 코드 (예: USDT-BTC)
  name: string;              // 한글명
  symbol: string;             // 차트 심볼 (예: BTC/KRW)
}

export const CRYPTO_CURRENCIES: Record<string, CryptoInfo> = {
  BTC: {
    code: 'KRW-BTC',
    usdtCode: 'USDT-BTC',
    name: '비트코인',
    symbol: 'BTC/KRW',
  },
  SOL: {
    code: 'KRW-SOL',
    usdtCode: 'USDT-SOL',
    name: '솔라나',
    symbol: 'SOL/KRW',
  },
  ETH: {
    code: 'KRW-ETH',
    usdtCode: 'USDT-ETH',
    name: '이더리움',
    symbol: 'ETH/KRW',
  },
  DOGE: {
    code: 'KRW-DOGE',
    usdtCode: 'USDT-DOGE',
    name: '도지코인',
    symbol: 'DOGE/KRW',
  },
} as const;

// 기본 선택 코인
export const DEFAULT_CRYPTO = 'BTC';

// 특정 코인 정보 가져오기
export const getCryptoInfo = (symbol: string): CryptoInfo => {
  return CRYPTO_CURRENCIES[symbol] || CRYPTO_CURRENCIES[DEFAULT_CRYPTO];
};

