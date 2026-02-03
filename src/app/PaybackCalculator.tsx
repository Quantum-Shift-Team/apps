"use client";

import { useState, useEffect } from "react";
import { EXCHANGES } from "@/lib/exchanges";
import Image from "next/image";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";


export function PaybackCalculator() {
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [leverage, setLeverage] = useState<number>(1);
  const [seedMoney, setSeedMoney] = useState<number>(50); // 초기값 50 = 50만원
  const [tradingFrequency, setTradingFrequency] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // 스텝 변경 시 페이지 상단으로 스크롤
  useEffect(() => {
    // 계산기 오버레이의 스크롤 컨테이너를 찾아서 스크롤
    const scrollContainer = document.querySelector('.calculator-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 폴백으로 window 스크롤 사용
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // 레버리지 프리셋
  const leveragePresets = [1, 2, 5, 10, 20, 50, 75, 100, 125, 150];

  // 거래 빈도 옵션
  const frequencyOptions = [
    {
      id: "beginner",
      label: "초보",
      description: "하루 1-2회",
      emoji: "🌱",
      trades: 1.5,
    },
    {
      id: "casual",
      label: "일반",
      description: "하루 3-5회",
      emoji: "📊",
      trades: 4,
    },
    {
      id: "intermediate",
      label: "중급",
      description: "하루 5-10회",
      emoji: "📈",
      trades: 7.5,
    },
    {
      id: "active",
      label: "활발",
      description: "하루 10-20회",
      emoji: "⚡",
      trades: 15,
    },
    {
      id: "very_active",
      label: "매우 활발",
      description: "하루 20-50회",
      emoji: "🔥",
      trades: 35,
    },
    {
      id: "professional",
      label: "전문가",
      description: "하루 50회 이상",
      emoji: "💎",
      trades: 70,
    },
  ];

  // 슬라이더 값을 실제 금액(만원)으로 변환
  const sliderToMoney = (value: number): number => {
    if (value <= 100) {
      // 1~100: 1만원 단위 (1만원 ~ 100만원)
      return value;
    } else if (value <= 190) {
      // 101~190: 10만원 단위 (110만원 ~ 1000만원)
      return 100 + (value - 100) * 10;
    } else {
      // 191~280: 100만원 단위 (1100만원 ~ 1억원)
      return 1000 + (value - 190) * 100;
    }
  };

  const actualSeedMoney = sliderToMoney(seedMoney); // 실제 금액 (만원)

  // 현재 단위 표시
  const getCurrentUnit = (): string => {
    if (actualSeedMoney <= 100) return "1만원 단위";
    if (actualSeedMoney <= 1000) return "10만원 단위";
    return "100만원 단위";
  };

  const steps = [
    { number: 1, title: "거래소", active: currentStep >= 1 },
    { number: 2, title: "레버리지", active: currentStep >= 2 },
    { number: 3, title: "시드 금액", active: currentStep >= 3 },
    { number: 4, title: "거래 빈도", active: currentStep >= 4 },
    { number: 5, title: "결과", active: currentStep >= 5 },
  ];

  return (
    <div className="relative h-full">
      {/* 메인 콘텐츠 영역 - 스크롤 가능 */}
      <div className="h-full overflow-y-auto pb-24">
        <div className="max-w-3xl mx-auto">
          {/* 계산기 모드 - 기존 UI */}
          <div className="text-center mb-8 pt-20">
            <h3 className="text-xl md:text-2xl font-semibold text-green-400 mb-2">
              내가 돌려받을 페이백 금액은?
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              거래소별 최적의 페이백 금액을 계산해보세요
            </p>
          </div>

          {/* 단계 인디케이터 */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors relative z-10 ${
                      step.active
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="text-xs text-gray-400 mt-2">
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-700 absolute ml-12 mt-5 z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 스텝별 콘텐츠 */}
          {/* Step 1: 거래소 선택 */}
          {currentStep === 1 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">
                거래소를 선택해주세요
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {EXCHANGES.map((exchange) => (
                  <button
                    key={exchange.id}
                    onClick={() => setSelectedExchange(exchange.id)}
                    className={`px-3 py-2 rounded-lg border transition-all ${
                      selectedExchange === exchange.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 bg-gray-70"
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        {exchange.logo.endsWith('.svg') || exchange.logo.endsWith('.png') ? (
                          <Image 
                            src={exchange.logo}
                            alt={exchange.name}
                            width={20}
                            height={20}
                            className={exchange.logoSize}
                          />
                        ) : (
                          <span className={`font-tossface ${exchange.logoSize}`}>
                            {exchange.logo}
                          </span>
                        )}
                        <span className="font-semibold text-sm text-white">
                          {exchange.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {exchange.paybackRate}% 페이백
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: 레버리지 선택 */}
          {currentStep === 2 && (
            <div>
              <h4 className="text-lg font-semibold mb-6">
                레버리지를 선택해주세요
              </h4>

              {/* 현재 선택된 레버리지 표시 */}
              <div className="text-center mb-8">
                <div className="text-sm text-gray-400 mb-2">
                  선택된 레버리지
                </div>
                <div className="text-5xl font-bold text-blue-400">
                  {leverage}x
                </div>
              </div>

              {/* 슬라이더 */}
              <div className="mb-8">
                <input
                  type="range"
                  min="1"
                  max="150"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      ((leverage - 1) / 149) * 100
                    }%, #374151 ${
                      ((leverage - 1) / 149) * 100
                    }%, #374151 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1x</span>
                  <span>75x</span>
                  <span>150x</span>
                </div>
              </div>

              {/* 프리셋 버튼들 */}
              <div>
                <div className="text-sm text-gray-400 mb-3">빠른 선택</div>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {leveragePresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setLeverage(preset)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                        leverage === preset
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {preset}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 시드 금액 선택 */}
          {currentStep === 3 && (
            <div>
              <h4 className="text-lg font-semibold mb-6">
                시드 금액을 선택해주세요
              </h4>

              {/* 현재 선택된 시드 금액 표시 */}
              <div className="text-center mb-8">
                <div className="text-sm text-gray-400 mb-2">
                  선택된 시드 금액
                </div>
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  {actualSeedMoney >= 10000
                    ? `${(actualSeedMoney / 10000).toLocaleString()}억원`
                    : `${actualSeedMoney.toLocaleString()}만원`}
                </div>
                <div className="text-sm text-gray-500">
                  ≈ {(actualSeedMoney * 10000).toLocaleString()}원
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {getCurrentUnit()}
                </div>
              </div>

              {/* 슬라이더 */}
              <div className="mb-8">
                <input
                  type="range"
                  min="1"
                  max="280"
                  step="1"
                  value={seedMoney}
                  onChange={(e) => setSeedMoney(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      ((seedMoney - 1) / 279) * 100
                    }%, #374151 ${
                      ((seedMoney - 1) / 279) * 100
                    }%, #374151 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1만원</span>
                  <span>100만원</span>
                  <span>1000만원</span>
                  <span>1억원</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 거래 빈도 선택 */}
          {currentStep === 4 && (
            <div>
              <h4 className="text-lg font-semibold mb-6">
                거래 빈도를 선택해주세요
              </h4>

              {/* 거래 빈도 옵션 카드 */}
              <div className="grid grid-cols-3 gap-3">
                {frequencyOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTradingFrequency(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      tradingFrequency === option.id
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-base font-bold text-white mb-1">
                        {option.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: 결과 페이지 */}
          {currentStep === 5 &&
            (() => {
              const selectedExchangeData = EXCHANGES.find(
                (ex) => ex.id === selectedExchange
              );
              const selectedFrequency = frequencyOptions.find(
                (opt) => opt.id === tradingFrequency
              );

              if (!selectedExchangeData || !selectedFrequency) return null;

              // 계산
              const dailyTrades = selectedFrequency.trades;
              const tradingVolume =
                actualSeedMoney * 10000 * leverage * dailyTrades; // 일일 거래량 (원)
              const avgFee =
                (selectedExchangeData.makerFee +
                  selectedExchangeData.takerFee) /
                2 /
                100;
              const dailyFee = tradingVolume * avgFee;
              const dailyPayback =
                dailyFee * (selectedExchangeData.paybackRate / 100);
              const monthlyPayback = dailyPayback * 30;
              const yearlyPayback = dailyPayback * 365;

              return (
                <div className="space-y-6">
                  {/* 월간/연간 예상 */}
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <div className="text-sm text-gray-400">
                        월간 예상 페이백
                      </div>
                      <div className="text-3xl font-bold text-green-400">
                        {Math.round(monthlyPayback).toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-500">
                        약 {Math.round(monthlyPayback / 10000).toLocaleString()}만원
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-600"></div>
                    <div className="text-center space-y-2">
                      <div className="text-sm text-gray-400">
                        연간 예상 페이백
                      </div>
                      <div className="text-3xl font-bold text-yellow-400">
                        {Math.round(yearlyPayback).toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-500">
                        약 {Math.round(yearlyPayback / 10000).toLocaleString()}만원
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-600"></div>
                  </div>

                  {/* 선택 정보 요약 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">선택 정보</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">거래소</div>
                        <div className="text-lg font-bold text-white mt-1">
                          {selectedExchangeData.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">레버리지</div>
                        <div className="text-lg font-bold text-white mt-1">
                          {leverage}x
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">시드 금액</div>
                        <div className="text-lg font-bold text-white mt-1">
                          {actualSeedMoney.toLocaleString()}만원
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">거래 빈도</div>
                        <div className="text-lg font-bold text-white mt-1">
                          {selectedFrequency.label}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gray-600"></div>


                  {/* 상세 정보 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      상세 계산 내역
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400">일일 거래 횟수</span>
                        <span className="text-white font-semibold">
                          {dailyTrades}회
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400">일일 거래량</span>
                        <span className="text-white font-semibold">
                          {Math.round(tradingVolume).toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400">평균 수수료율</span>
                        <span className="text-white font-semibold">
                          {(avgFee * 100).toFixed(3)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400">일일 수수료</span>
                        <span className="text-white font-semibold">
                          {Math.round(dailyFee).toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-800">
                        <span className="text-gray-400">페이백 비율</span>
                        <span className="text-blue-400 font-semibold">
                          {selectedExchangeData.paybackRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">일일 페이백</span>
                        <span className="text-green-400 font-semibold text-lg">
                          {Math.round(dailyPayback).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>

      {/* 하단 고정 버튼 영역 */}
      {currentStep === 1 && (
        <FixedBottomButton
          onClick={() => selectedExchange && setCurrentStep(2)}
          disabled={!selectedExchange}
          className={`w-[90%] py-3 rounded-lg transition-colors font-medium ${
            selectedExchange
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          다음 단계로
        </FixedBottomButton>
      )}

      {currentStep === 2 && (
        <FixedBottomButton
          onClick={() => setCurrentStep(3)}
        >
          다음 단계로
        </FixedBottomButton>
      )}

      {currentStep === 3 && (
        <FixedBottomButton
          onClick={() => setCurrentStep(4)}
        >
          다음 단계로
        </FixedBottomButton>
      )}

      {currentStep === 4 && (
        <FixedBottomButton
          onClick={() => tradingFrequency && setCurrentStep(5)}
          disabled={!tradingFrequency}
          className={`w-[90%] py-3 rounded-lg transition-colors font-medium ${
            tradingFrequency
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          결과 보기
        </FixedBottomButton>
      )}

      {currentStep === 5 && (
        <FixedBottomButton
          bgOpacity={90}
          onClick={() => {
            setCurrentStep(1);
            setSelectedExchange(null);
            setLeverage(1);
            setSeedMoney(50);
            setTradingFrequency(null);
          }}
        >
          다시 계산하기
        </FixedBottomButton>
      )}
    </div>
  );
}