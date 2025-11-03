import { NextRequest, NextResponse } from 'next/server';

interface AnalyzeRequest {
  markets?: string[]; // 코인 배열 (선택적, 없으면 모든 코인)
  interval: number;
  hours: number;
  to?: string; // 특정 시점 파라미터 (선택적)
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { markets, interval, hours, to } = body;

    // AI_SERVER 환경 변수 확인
    const aiServer = process.env.AI_SERVER;

    // AI 서버로 분석 요청
    const aiApiUrl = `${aiServer}/trading/analyze`;
    
    const response = await fetch(aiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(markets && { markets }), // markets가 있으면 포함
        interval,
        hours,
        ...(to && { to }), // to가 있으면 포함
      }),
    });

    if (!response.ok) {
      console.error('AI server error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'AI server request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(
      { error: 'Failed to process analyze request' },
      { status: 500 }
    );
  }
}

