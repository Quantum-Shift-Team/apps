'use client'

import { useState } from 'react'
import { EXCHANGES } from '@/lib/exchanges'

export function PaybackCalculator() {
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { number: 1, title: '거래소', active: currentStep >= 1 },
    { number: 2, title: '레버리지', active: currentStep >= 2 },
    { number: 3, title: '시드 금액', active: currentStep >= 3 },
    { number: 4, title: '거래 빈도', active: currentStep >= 4 },
    { number: 5, title: '결과', active: currentStep >= 5 }
  ]

  return (
    <div className="px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">페이백 계산기</h2>
          <p className="text-gray-400 text-sm md:text-base">레퍼럴 페이백 계산기</p>
        </div>

        {/* 메인 질문 */}
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
                  <div className="hidden md:block w-8 h-0.5 bg-gray-700 absolute ml-12 mt-5 z-0"></div>
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
        {selectedExchange && (
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              다음 단계로
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
