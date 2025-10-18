"use client";

import { EXCHANGES } from "@/lib/exchanges";
import Link from "next/link";
import Image from "next/image";

export function ExchangeSection() {
  return (
    <div className="px-6 py-6 space-y-6 mb-6">
      <div className="flex w-full flex-col content-center items-center justify-center gap-4">
        {/* 헤더 섹션 */}
        <div className="relative w-full">
          {/* 상단 배지 */}
          <div className="absolute -top-5 left-0 z-10 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
            최대 수수료 페이백! 타업체 비교 불가
            <div className="absolute top-full left-4 h-0 w-0 border-x-8 border-t-[8px] border-x-transparent border-t-blue-600"></div>
          </div>

          {/* 제목 및 더보기 */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold md:text-2xl text-white">
                제휴 거래소
              </h4>
            </div>
            <a
              className="flex items-center justify-center text-sm text-gray-300 hover:text-blue-400 transition-colors"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* 거래소 그리드 */}
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 md:px-0">
          {EXCHANGES.map((exchange) => (
            <Link key={exchange.id} href={`/exchange/${exchange.id}`} className="group">
              <div
                className={`flex items-center gap-4 rounded-xl bg-gray-800/50 border border-gray-700/50 px-4 py-2 break-keep transition-all duration-200`}
              >
           

                {/* 정보 영역 */}
                <div className="flex h-full grow flex-col justify-center gap-1 min-w-0">
                   <div>
                     {/* 로고와 거래소 이름 */}
                     <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 overflow-hidden rounded-lg flex items-center justify-center">
                          {exchange.logo.endsWith('.svg') || exchange.logo.endsWith('.png') ? (
                            <Image 
                              src={exchange.logo}
                              alt={exchange.name}
                              width={32}
                              height={32}
                              className={exchange.logoSize}
                            />
                          ) : (
                            <span className={`font-tossface ${exchange.logoSize}`}>
                              {exchange.logo}
                            </span>
                          )}
                        </div>
                       <h3 className="text-sm font-semibold text-white">
                         {exchange.name}
                       </h3>
                     </div>
                     <p className="text-xs text-gray-300 truncate">
                       {exchange.description}
                     </p>
                   </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>
                      지정가 <span className="text-blue-400 font-medium">{exchange.makerFee}%</span>
                    </span>
                    <span className="w-px h-3 bg-gray-600"></span>
                    <span>
                      시장가 <span className="text-blue-400 font-medium">{exchange.takerFee}%</span>
                    </span>
                  </div>
                </div>

                {/* 화살표 아이콘 */}
                <div className="flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
