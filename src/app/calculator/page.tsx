import { MainLayout } from "@/components/layout/MainLayout";
import { PaybackCalculator } from "../PaybackCalculator";

export default function CalculatorPage() {
  return (
    <MainLayout>
      {/* 계산기 페이지 - 헤더와 모바일 네비게이션 높이 고려 */}
      <div className="pt-20 md:pt-20 pb-20 md:pb-0 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          <PaybackCalculator />
        </div>
      </div>
    </MainLayout>
  );
}
