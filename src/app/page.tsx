"use client";

import { useState} from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DynamicBanner } from "@/components/layout/DynamicBanner";
import { ExchangeSection } from "./ExchangeSection";
import { RealtimePaybackSection } from "./RealtimePaybackSection";
import { PaybackCalculator } from "./PaybackCalculator";
import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openCalculator = () => {
    setIsAnimating(true);
    setShowCalculator(true);
    // 메인 페이지 스크롤 막기
    document.body.style.overflow = 'hidden';
  };

  const closeCalculator = () => {
    setIsAnimating(false);
    // 메인 페이지 스크롤 복원
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setShowCalculator(false);
    }, 300);
  };

  return (
    <MainLayout>
      <DynamicBanner />
      
      {/* 메인 콘텐츠 - 헤더 높이만큼 패딩 적용 */}
      <div className={`pt-${LAYOUT_CONSTANTS.HEADER_HEIGHT} md:pt-0`}>
        {/* 광고판 - 화면 꽉차게 */}
        <div
          className="w-full h-96 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/dummy_banner.png)" }}
        ></div>

        {/* 거래소 정보 */}
        <ExchangeSection />

        {/* 실시간 페이백 환급 현황 */}
        <RealtimePaybackSection />

        {/* 페이백 계산기 섹션 */}
        <div className="px-6 py-2 bg-gray-900 text-white mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={openCalculator}
              className="inline-block w-[90%] py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              내 환급 금액 계산하기
            </button>
            <p className="text-gray-400 text-sm mt-2">
              나도 페이백을 받을 수 있는지 지금 확인해보세요!
            </p>
          </div>
        </div>
      </div>

      {/* 계산기 오버레이 */}
      {showCalculator && (
        <div className={`fixed inset-0 z-50 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <BackHeader backLink="/" onClose={closeCalculator} />
          <div className="h-full overflow-y-auto pt-14">
            <div className="w-full max-w-4xl mx-auto px-6">
              <PaybackCalculator onClose={closeCalculator} />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
