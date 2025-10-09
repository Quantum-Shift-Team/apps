import { MainLayout } from '@/components/layout/MainLayout'
import { DynamicBanner } from '@/components/layout/DynamicBanner'
import { ExchangeSection } from './ExchangeSection'
import { PaybackCalculator } from './PaybackCalculator'

export default function Home() {
  return (
    <>
      <DynamicBanner />
      <MainLayout padding="px-0">
        {/* 광고판 - 화면 꽉차게 */}
        <div className="absolute left-0 right-0 w-full h-96 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="font-tossface text-4xl">🚀</span>
              <h2 className="text-4xl font-bold text-blue-600">Quantum Shift</h2>
            </div>
            <p className="text-gray-600 text-xl mb-6">프로젝트 관리의 새로운 패러다임을 경험하세요</p>
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">무료 체험</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">24/7 지원</span>
            </div>
          </div>
        </div>
      
        {/* 거래소 정보 */}
        <ExchangeSection />
        
        {/* 페이백 계산기 */}
        <PaybackCalculator />
      </MainLayout>
    </>
  )
}