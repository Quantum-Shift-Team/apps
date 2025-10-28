import { NextRequest, NextResponse } from 'next/server';

// 인메모리 캐시 (서버리스 함수 간에는 공유되지 않지만, 같은 함수 인스턴스 내에서는 재사용됨)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, { data: any; timestamp: number }>();

const CACHE_DURATION = 5 * 60 * 1000; // 5분 (밀리초)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const interval = searchParams.get('interval');
  const market = searchParams.get('market') || 'KRW-BTC';
  const count = searchParams.get('count') || '200';

  const cacheKey = `${interval}-${market}-${count}`;

  // 캐시 확인
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Cache hit for:', cacheKey);
    return NextResponse.json({
      data: cached.data,
      timestamp: cached.timestamp,
      cached: true
    });
  }

  try {
    // 분봉인지 일봉인지 판단
    const isMinuteCandle = !['D', 'W', 'M'].includes(interval || '');
    
    // API URL 생성
    let apiUrl = '';
    if (isMinuteCandle) {
      apiUrl = `https://api.upbit.com/v1/candles/minutes/${interval}?market=${market}&count=${count}`;
    } else {
      apiUrl = `https://api.upbit.com/v1/candles/days?market=${market}&count=${count}`;
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 300 } // Next.js의 fetch 캐싱도 설정
    });
    
    if (!response.ok) {
      throw new Error(`Upbit API error: ${response.status}`);
    }

    const data = await response.json();
    const timestamp = Date.now();
    
    // 인메모리 캐시에 저장
    cache.set(cacheKey, { data, timestamp });
    
    return NextResponse.json({
      data,
      timestamp,
      cached: false
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candle data' },
      { status: 500 }
    );
  }
}
