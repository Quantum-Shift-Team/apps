import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface AnalyzeRequest {
  markets?: string[]; // 코인 배열 (선택적, 없으면 모든 코인)
  interval: number;
  hours: number;
  refresh?: boolean; // 새로고침 여부 (00분~05분 사이일 때 true)
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { markets, interval, hours } = body;

    // DB에서 분석 데이터 조회
    const whereClause: {
      interval: number;
      hours: number;
      market?: { in: string[] };
    } = {
      interval,
      hours,
    };

    // markets가 지정된 경우 해당 마켓들만 조회
    if (markets && markets.length > 0) {
      whereClause.market = {
        in: markets,
      };
    }

    // 최신 데이터만 가져오기 (created_at 기준 내림차순)
    const analyzeDataList = await db.tradingAnalyze.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
    });

    // 각 마켓별로 가장 최신 데이터만 선택
    const latestByMarket = new Map<string, typeof analyzeDataList[0]>();
    
    for (const data of analyzeDataList) {
      if (!latestByMarket.has(data.market)) {
        latestByMarket.set(data.market, data);
      }
    }

    // 응답 형식 변환
    const results = Array.from(latestByMarket.values()).map((data) => ({
      id: data.id,
      market: data.market,
      interval: data.interval,
      hours: data.hours,
      current_price: data.current_price,
      lowest_price: data.lowest_price,
      highest_price: data.highest_price,
      analysis_report: data.analysis_report,
      technical_indicators: data.technical_indicators as Record<string, number> | undefined,
      trading_signals: data.trading_signals as Record<string, string> | undefined,
      created_at: data.created_at,
    }));

    // markets가 지정된 경우와 아닌 경우 응답 형식 다르게 처리
    if (markets && markets.length > 0) {
      // 배열로 반환
      return NextResponse.json(results);
    } else {
      // 객체 형태로 반환 (마켓별로 키가 있는 형태)
      const resultObject: Record<string, typeof results[0]> = {};
      results.forEach((result) => {
        resultObject[result.market] = result;
      });
      return NextResponse.json(resultObject);
    }

  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(
      { error: 'Failed to process analyze request' },
      { status: 500 }
    );
  }
}

