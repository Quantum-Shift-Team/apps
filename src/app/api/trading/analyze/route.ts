import { NextRequest, NextResponse } from 'next/server';

interface AnalyzeRequest {
  market: string;
  interval: number;
  hours: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { market, interval, hours } = body;

    // AI_SERVER 환경 변수 확인
    const aiServer = process.env.AI_SERVER;

    // AI_SERVER가 localhost인 경우 빈 객체 반환
    if (!aiServer || aiServer.includes('localhost') || aiServer.includes('127.0.0.1')) {
      console.log('AI_SERVER is localhost, returning empty response');
      return NextResponse.json(
        {
            "market": "KRW-BTC",
            "interval": 15,
            "hours": 12,
            "current_price": 164378000.0,
            "lowest_price": 163410000.0,
            "highest_price": 164573000.0,
            "analysis_report": "# KRW-BTC 거래 분석 보고서\n\n## 1. 시장 상황 분석\n### 현재 추세\n현재 KRW-BTC 시장은 **상승 추세**를 보이고 있습니다. 최근 12시간 동안의 가격 변동을 살펴보면, 현재가는 164,378,000원으로, 최근 12시간의 최고가인 164,573,000원에 근접하고 있습니다.\n\n### 가격 위치 및 변동성 분석\n- **현재가**: 164,378,000원\n- **최고가**: 164,573,000원\n- **최저가**: 163,410,000원\n\n최근 12시간 동안의 변동폭은 약 1,163,000원이며, 이는 시장의 **상대적으로 높은 변동성**을 나타냅니다. 현재가가 볼린저밴드의 상단을 돌파했으므로, 과매수 상태일 가능성도 염두에 두어야 합니다.\n\n## 2. 기술적 지표 해석\n### RSI (상대강도지수)\n- **현재 RSI**: 60.52\n- **해석**: RSI가 70을 초과하지 않으므로 중립 상태입니다. 이는 과매수 상태가 아니라는 것을 의미하며, 상승 여력이 남아있다고 볼 수 있습니다.\n\n### MACD (이동평균수렴발산지수)\n- **MACD**: 62003.79\n- **신호선**: 58219.16\n- **MACD 히스토그램**: 3784.64\n- **해석**: MACD가 신호선을 상향 돌파하며 상승 추세를 나타내고 있습니다. 이는 매수 신호로 해석됩니다.\n\n### 볼린저밴드\n- **상단**: 164566974.00\n- **중간**: 163999500.00\n- **하단**: 163432026.00\n- **해석**: 현재 가격이 상단을 돌파한 상태로, 과매수 가능성을 시사합니다. 이 경우 조정이 올 수 있으므로 주의가 필요합니다.\n\n### 기타 지표\n- **Stochastic**: stoch_k(88.49), stoch_d(84.61) - 과매수 영역에 가까운 상태\n- **ADX**: 31.59 - 강한 추세가 유지되고 있음을 나타냄\n- **ATR**: 216070.53 - 변동성이 큰 시장\n- **OBV**: -41.36 - 거래량의 감소를 나타내는 지표\n\n## 3. 매매 전략 추천\n### 진입점 (Entry Point)\n- **매수 가격**: 164200000원\n  - **근거**: 현재가와 SMA, EMA를 고려할 때, 164200000원에서의 매수는 상승 추세를 따라가기 위한 적절한 진입점입니다.\n\n### 손절가 (Stop Loss)\n- **손절 가격**: 163500000원\n  - **근거**: 최근 최저가와 볼린저밴드 하단을 고려하여, 손절가를 설정함으로써 리스크를 관리합니다.\n\n### 익절가 (Take Profit)\n- **익절 목표 가격**: 165000000원\n  - **근거**: 현재의 상승 추세가 지속될 경우, 다음 저항선으로 예상되는 가격입니다.\n\n## 4. 리스크 관리\n### 예상 리스크 및 대응 방안\n- **리스크**: 매수 후 가격이 손절가 이하로 하락할 경우 손실이 발생할 수 있습니다.\n- **대응 방안**: 손절가에 도달할 경우 즉시 포지션을 청산하고, 시장의 변동성에 따라 추가 매매 전략을 수립합니다.\n\n### 포지션 사이징 권장사항\n- 투자 자산의 2-5%를 초과하는 포지션을 잡지 않는 것이 좋습니다. 예를 들어, 총 자산의 5%를 투자하는 경우, 손실이 발생하더라도 자산의 큰 부분이 영향을 받지 않도록 설정합니다.\n\n---\n\n이 보고서는 현재 시장 상황과 기술적 지표 분석을 바탕으로 한 매매 전략을 제시합니다. 지속적인 시장 모니터링과 리스크 관리를 통해 안정적인 거래를 진행하시기 바랍니다.",
            "technical_indicators": {
                "sma_20": 163999500.0,
                "ema_12": 164183897.91747966,
                "ema_26": 164121894.12492055,
                "rsi": 60.51576935566353,
                "macd": 62003.79255911708,
                "macd_signal": 58219.157349249246,
                "macd_hist": 3784.635209867833,
                "bb_upper": 163432026.00337803,
                "bb_middle": 163999500.0,
                "bb_lower": 164566973.99662197,
                "stoch_k": 88.48991242875238,
                "stoch_d": 84.61061708256756,
                "adx": 31.59341566541723,
                "atr": 216070.52504920145,
                "obv": -41.356160700000004
            },
            "trading_signals": {
                "rsi": "중립",
                "macd": "상승 추세 (매수 신호)",
                "bb": "상단 돌파 (과매수 가능)"
            },
            "tmp": "예시 응답입니다."
        }
      );
    }

    // AI 서버로 분석 요청
    const aiApiUrl = `${aiServer}/trading/analyze`;
    
    const response = await fetch(aiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        market,
        interval,
        hours,
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

