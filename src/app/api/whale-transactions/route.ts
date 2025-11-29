import { NextRequest, NextResponse } from 'next/server';
import { EXCHANGES } from '@/lib/exchanges';

// 인메모리 캐시
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, { data: any; timestamp: number; duration: number }>();

// 캐시 지속 시간: 1분~3분 사이 랜덤 (60초 ~ 180초)
const getCacheDuration = () => {
  return Math.floor(Math.random() * 120000) + 60000; // 60,000ms ~ 180,000ms
};

// 거래소 선택 함수
const getRandomExchange = () => {
  const random = Math.random();
  if (random < 0.8) {
    return Math.random() < 0.5 ? "Binance" : "Bybit";
  }
  const otherExchanges = EXCHANGES.filter(
    (ex) => ex.name !== "Binance" && ex.name !== "Bybit"
  );
  return otherExchanges[Math.floor(Math.random() * otherExchanges.length)].name;
};

// 거래소 정보 가져오기
const getExchangeInfo = (exchangeName: string) => {
  return EXCHANGES.find((ex) => ex.name === exchangeName) || EXCHANGES[0];
};

// 암호화폐 종류
const CRYPTOCURRENCIES = ["USDT", "BTC"];

// 고래 거래 데이터 생성
const generateWhaleTransactions = () => {
  const now = Date.now();
  // 30분 전(1800000ms) ~ 1분 전(60000ms) 사이의 랜덤 타임스탬프 5개 생성
  const timestamps = Array.from({ length: 5 }, () => {
    // 1분 전 ~ 30분 전 사이 랜덤 (밀리초)
    const randomMinutesAgo = Math.random() * 29 + 1; // 1 ~ 30분
    const randomMsAgo = randomMinutesAgo * 60 * 1000;
    return now - randomMsAgo;
  }).sort((a, b) => b - a); // 최신 것부터 오래된 순서로 정렬

  return timestamps.map((timestamp, index) => {
    const crypto = CRYPTOCURRENCIES[Math.floor(Math.random() * CRYPTOCURRENCIES.length)];
    const isDeposit = Math.random() > 0.5;
    // 10만달러 ~ 100만달러 사이의 랜덤 금액 (달러 단위)
    const amountInDollars = Math.floor(Math.random() * 900000) + 100000; // 100,000 ~ 1,000,000
    const exchangeName = getRandomExchange();
    const exchangeInfo = getExchangeInfo(exchangeName);
    
    return {
      id: timestamp + index, // 고유 ID 생성
      type: isDeposit ? "deposit" : "withdraw",
      crypto,
      amountInDollars,
      exchange: exchangeName,
      exchangeId: exchangeInfo.id,
      logo: exchangeInfo.logo,
      logoSize: exchangeInfo.logoSize,
      timestamp: new Date(timestamp).toISOString(),
    };
  });
};

export async function GET(request: NextRequest) {
  const cacheKey = 'whale-transactions';
  
  // 캐시 확인
  const cached = cache.get(cacheKey);
  if (cached) {
    const cacheAge = Date.now() - cached.timestamp;
    // 캐시가 아직 유효한지 확인 (저장된 duration 기준)
    if (cacheAge < cached.duration) {
      return NextResponse.json({
        data: cached.data,
        timestamp: cached.timestamp,
        cached: true,
      });
    }
  }

  // 새 데이터 생성
  const transactions = generateWhaleTransactions();
  const timestamp = Date.now();
  const duration = getCacheDuration(); // 1분~3분 사이 랜덤
  
  // 캐시에 저장 (데이터, 타임스탬프, 지속 시간 함께 저장)
  cache.set(cacheKey, { data: transactions, timestamp, duration });
  
  return NextResponse.json({
    data: transactions,
    timestamp,
    cached: false,
  }, {
    // Next.js의 revalidate 설정 (1분~3분 사이 랜덤)
    headers: {
      'Cache-Control': `public, s-maxage=${Math.floor(duration / 1000)}, stale-while-revalidate=60`,
    },
  });
}

