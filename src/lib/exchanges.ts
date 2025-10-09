// 거래소 정보 상수
export const EXCHANGES = [
  {
    id: 'bybit',
    name: 'Bybit',
    logo: '🔵',
    paybackRate: 40,
    makerFee: 0.012,
    takerFee: 0.033,
    logoBg: 'bg-blue-100',
    cardBg: 'bg-blue-50',
    description: '수수료 40% 페이백'
  },
  {
    id: 'bitget',
    name: 'Bitget',
    logo: '⚡',
    paybackRate: 50,
    makerFee: 0.01,
    takerFee: 0.02,
    logoBg: 'bg-yellow-100',
    cardBg: 'bg-yellow-50',
    description: '수수료 50% 페이백'
  },
  {
    id: 'okx',
    name: 'OKX',
    logo: '⭕',
    paybackRate: 50,
    makerFee: 0.01,
    takerFee: 0.025,
    logoBg: 'bg-gray-100',
    cardBg: 'bg-gray-50',
    description: '수수료 50% 페이백'
  },
  {
    id: 'bingx',
    name: 'BingX',
    logo: '❌',
    paybackRate: 60,
    makerFee: 0.008,
    takerFee: 0.02,
    logoBg: 'bg-red-100',
    cardBg: 'bg-red-50',
    description: '수수료 60% 페이백'
  },
  {
    id: 'gateio',
    name: 'Gate.io',
    logo: '🚪',
    paybackRate: 75,
    makerFee: 0.005,
    takerFee: 0.01,
    logoBg: 'bg-purple-100',
    cardBg: 'bg-purple-50',
    description: '수수료 75% 페이백'
  },
  {
    id: 'binance',
    name: 'Binance',
    logo: '🟡',
    paybackRate: 40,
    makerFee: 0.012,
    takerFee: 0.03,
    logoBg: 'bg-amber-100',
    cardBg: 'bg-amber-50',
    description: '수수료 40% 페이백'
  }
] as const

export type ExchangeId = typeof EXCHANGES[number]['id']
