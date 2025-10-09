'use client'

import { EXCHANGES } from '@/lib/exchanges'

export function ExchangeSection() {
  return (
    <div className="px-6 py-6 pt-[420px] space-y-6">
      <div className="flex w-full flex-col content-center items-center justify-center gap-4">
        {/* 헤더 섹션 */}
        <div className="relative w-full">
          {/* 상단 배지 */}
          <div className="absolute -top-5 left-0 z-10 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 shadow-sm">
            최대 수수료 페이백! 타업체 비교 불가
            <div className="absolute top-full left-4 h-0 w-0 border-x-8 border-t-[8px] border-x-transparent border-t-blue-50"></div>
          </div>
          
          {/* 제목 및 더보기 */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold md:text-2xl">
                제휴 거래소
              </h4>
            </div>
            <a className="flex items-center justify-center text-sm text-gray-700 hover:text-blue-600 transition-colors" href="#">
              거래소 더보기
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* 거래소 그리드 */}
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 md:px-0">
          {EXCHANGES.map((exchange) => (
            <a key={exchange.id} href="#" className="group">
              <div className={`flex items-center gap-2 rounded-lg ${exchange.cardBg} p-2.5 break-keep transition-all hover:bg-opacity-80`}>
                {/* 로고 이미지 영역 */}
                <div className={`aspect-[16/9] h-16 md:h-20 overflow-hidden rounded-lg ${exchange.logoBg} flex items-center justify-center`}>
                  <span className="font-tossface text-4xl">{exchange.logo}</span>
                </div>
                
                {/* 정보 영역 */}
                <div className="flex h-full grow flex-col justify-between">
                  <div>
                    <p className="text-sm font-bold xs:text-base">{exchange.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 xs:text-sm">페이백을 감안한 수수료율</p>
                    <p className="text-xs text-gray-600 xs:text-sm">
                      지정가 <span className="text-blue-600">{exchange.makerFee}%</span>
                      <br className="xs:hidden" />
                      {' '}시장가 <span className="text-blue-600">{exchange.takerFee}%</span>
                    </p>
                  </div>
                </div>
                
                {/* 화살표 아이콘 */}
                <div className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

