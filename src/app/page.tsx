import { MainLayout } from "@/components/layout/MainLayout";
import { DynamicBanner } from "@/components/layout/DynamicBanner";
import { ExchangeSection } from "./ExchangeSection";
import { RealtimePaybackSection } from "./RealtimePaybackSection";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <DynamicBanner />
      
      {/* 메인 콘텐츠 - 헤더 높이만큼 패딩 적용 */}
      <div className="pt-20 md:pt-20 pb-20 md:pb-0">
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
            <p className="text-gray-400 text-lg mb-8">
              나도 페이백을 받을 수 있는지 지금 확인해보세요
            </p>
            <Link
              href="/calculator"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              계산기 시작하기
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
