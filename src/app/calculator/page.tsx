"use client";

import { PaybackCalculator } from "../PaybackCalculator";
import { BackHeader } from "@/components/layout/BackHeader";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 고정 헤더 */}
      <div className="relative z-50">
        <BackHeader backLink="/" />
      </div>

      {/* 계산기 페이지 - 헤더 높이만큼 패딩 적용 */}
      <div className="min-h-screen flex items-start justify-center">
        <div className="w-full max-w-4xl mx-auto px-8">
          <PaybackCalculator onClose={() => window.history.back()} />
        </div>
      </div>
    </div>
  );
}
