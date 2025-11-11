"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DynamicBanner } from "@/components/layout/DynamicBanner";
import { ExchangeSection } from "./ExchangeSection";
import { RealtimePaybackSection } from "./RealtimePaybackSection";
import { PaybackCalculator } from "./PaybackCalculator";
import { BackHeader } from "@/components/layout/BackHeader";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { FloatingContactButtons } from "@/components/ui/FloatingContactButtons";

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openCalculator = () => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;
    setShowCalculator(true);
    // 메인 페이지 스크롤 막기 (위치 유지)
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    // 애니메이션 시작을 위해 약간의 지연
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const closeCalculator = () => {
    setIsAnimating(false);
    // 메인 페이지 스크롤 복원
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    setTimeout(() => {
      setShowCalculator(false);
    }, 500);
  };

  return (
    <MainLayout>
      <DynamicBanner />

      {/* 메인 콘텐츠 - 헤더 높이만큼 패딩 적용 */}
      <div
        className="md:pt-0"
        style={{
          paddingTop: `${(LAYOUT_CONSTANTS.HEADER_HEIGHT + 7) * 0.25}rem`,
        }}
      >
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
          <div className="max-w-3xl mx-auto text-center">
            <button
              onClick={openCalculator}
              className="inline-block w-[90%] py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
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
        <div
          className={`fixed inset-0 z-50 bg-gray-900 transform transition-transform duration-500 ease-out ${
            isAnimating ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <BackHeader backLink="/" onClose={closeCalculator} />
          <div className="calculator-scroll-container h-full overflow-y-auto pt-14">
            <div className="w-full max-w-3xl mx-auto px-6">
              <PaybackCalculator onClose={closeCalculator} />
            </div>
          </div>
        </div>
      )}

      {/* 플로팅 연락처 버튼 */}
      <FloatingContactButtons />
    </MainLayout>
  );
}
