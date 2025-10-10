'use client'

import { useState, useEffect } from 'react'
import { EXCHANGES } from '@/lib/exchanges'

// 더미 유저 데이터
const generateMockUsers = () => {
  const names = ['조남일', '최민준', '최건태', '이동연', '박도균']
  return names.map((name, index) => ({
    id: index + 1,
    name,
    amount: Math.floor(Math.random() * 500000) + 50000,
    exchange: EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)].name,
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
  }))
}

export function PaybackCalculator() {
  const [isCalculatorMode, setIsCalculatorMode] = useState(false)
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [liveUsers, setLiveUsers] = useState<Array<{
    id: number
    name: string
    amount: number
    exchange: string
    timestamp: string
  }>>([])

  // 초기 데이터 로드 (클라이언트에서만)
  useEffect(() => {
    setLiveUsers(generateMockUsers())
  }, [])

  const steps = [
    { number: 1, title: '거래소', active: currentStep >= 1 },
    { number: 2, title: '레버리지', active: currentStep >= 2 },
    { number: 3, title: '시드 금액', active: currentStep >= 3 },
    { number: 4, title: '거래 빈도', active: currentStep >= 4 },
    { number: 5, title: '결과', active: currentStep >= 5 }
  ]

  // 실시간 업데이트 효과 (5~15초 랜덤)
  useEffect(() => {
    if (!isCalculatorMode) {
      const scheduleNextUpdate = () => {
        const randomDelay = Math.floor(Math.random() * 10000) + 5000 // 5000~15000ms
        return setTimeout(() => {
          setLiveUsers(prev => {
            const names = ['조남일', '최민준', '최건태', '이동연', '박도균', '윤태섭', '조원규', '박준성', '허정민', '송하은']
            const newUser = {
              id: Date.now(),
              name: names[Math.floor(Math.random() * names.length)],
              amount: Math.floor(Math.random() * 500000) + 50000,
              exchange: EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)].name,
              timestamp: new Date().toISOString()
            }
            return [newUser, ...prev.slice(0, 4)]
          })
          timeoutId = scheduleNextUpdate()
        }, randomDelay)
      }

      let timeoutId = scheduleNextUpdate()
      return () => clearTimeout(timeoutId)
    }
  }, [isCalculatorMode])

  return (
    <div className="px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        {!isCalculatorMode ? (
          <>
            {/* 실시간 페이백 리스트 뷰 */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">실시간 페이백 환급 현황</h2>
              <p className="text-gray-400 text-sm md:text-base">
                지금 이 순간에도 페이백을 받고 있는 유저들
              </p>
            </div>

            {/* 실시간 유저 리스트 */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">실시간 환급 내역</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">LIVE</span>
                </div>
              </div>
              <div className="space-y-3">
                {liveUsers.slice(0, 5).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                    style={{
                      animation: index === 0 ? 'slideIn 0.5s ease-out' : 'none'
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.exchange}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        +{user.amount.toLocaleString()}원
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.timestamp).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 내 환급 금액 계산하기 버튼 */}
            <div className="text-center">
              <button
                onClick={() => setIsCalculatorMode(true)}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                💰 내 환급 금액 계산하기
              </button>
              <p className="text-gray-400 text-sm mt-4">
                나도 페이백을 받을 수 있는지 지금 확인해보세요
              </p>
            </div>
          </>
        ) : (
          <>
            {/* 계산기 모드 - 기존 UI */}
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-semibold text-green-400 mb-2">
                내가 돌려받을 페이백 금액은?
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                거래소별 최적의 페이백 금액을 계산해보세요
              </p>
            </div>

            {/* 단계 인디케이터 */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors relative z-10 ${
                      step.active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {step.number}
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{step.title}</span>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-700 absolute ml-12 mt-5 z-0"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 거래소 선택 섹션 */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">거래소를 선택해주세요</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {EXCHANGES.map((exchange) => (
                  <button
                    key={exchange.id}
                    onClick={() => {
                      setSelectedExchange(exchange.id)
                      setCurrentStep(2)
                    }}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedExchange === exchange.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full ${exchange.logoBg} flex items-center justify-center`}>
                        <span className="font-tossface text-lg">{exchange.logo}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">{exchange.name}</div>
                        <div className="text-xs text-gray-400">{exchange.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 다음 단계 버튼 */}
            <div className="text-center mt-8">
              <button
                onClick={() => selectedExchange && setCurrentStep(3)}
                disabled={!selectedExchange}
                className={`px-8 py-3 rounded-lg transition-colors font-medium ${
                  selectedExchange
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                다음 단계로
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
