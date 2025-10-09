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
        <div className="absolute left-0 right-0 w-full h-96 bg-cover bg-center bg-no-repeat mt-23 md:mt-0" style={{ backgroundImage: 'url(/images/dummy_banner.png)' }}>
        </div>
      
        {/* 거래소 정보 */}
        <ExchangeSection />
        
        {/* 페이백 계산기 */}
        <PaybackCalculator />
      </MainLayout>
    </>
  )
}