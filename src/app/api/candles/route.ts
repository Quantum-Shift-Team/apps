import { NextRequest, NextResponse } from 'next/server';

// 인메모리 캐시 (서버리스 함수 간에는 공유되지 않지만, 같은 함수 인스턴스 내에서는 재사용됨)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, { data: any; timestamp: number; dataTime?: string }>();

const CACHE_DURATION = 5 * 60 * 1000; // 5분 (밀리초)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const interval = searchParams.get('interval');
  const market = searchParams.get('market') || 'KRW-BTC';
  const count = searchParams.get('count') || '200';
  const to = searchParams.get('to'); // 특정 시점 파라미터 (선택적)

  // 현재 시점에서 분과 초 제거 (정시 기준)
  const now = new Date();
  
  // to 파라미터가 없으면 00분~05분 사이면 이전 시각으로 요청
  if (!to) {
    if (now.getMinutes() >= 0 && now.getMinutes() < 5) {
      now.setHours(now.getHours() - 1);
    }
  }
  
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const toTime = to || now.toISOString();

  // 캐시 키는 toTime의 정시 기준으로만 생성 (동일 정시 데이터 재사용)
  const cacheKey = `${interval}-${market}-${count}-${toTime}`;

  // 캐시 확인
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Cache hit for:', cacheKey);
    return NextResponse.json({
      data: cached.data,
      timestamp: cached.timestamp,
      cached: true,
      dataTime: cached.dataTime,
    });
  }

  try {
    // 분봉인지 일봉인지 판단
    const isMinuteCandle = !['D', 'W', 'M'].includes(interval || '');
    
    // API URL 생성
    let apiUrl = '';
    if (isMinuteCandle) {
      apiUrl = `https://api.upbit.com/v1/candles/minutes/${interval}?market=${market}&count=${count}&to=${toTime}`;
    } else {
      apiUrl = `https://api.upbit.com/v1/candles/days?market=${market}&count=${count}&to=${toTime}`;
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
    cache.set(cacheKey, { data, timestamp, dataTime: toTime });
    
    return NextResponse.json({
      data,
      timestamp,
      cached: false,
      dataTime: toTime,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candle data' },
      { status: 500 }
    );
  }
}
