"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import { FixedBottomButton } from "@/components/ui/FixedBottomButton";
import { useState, useEffect } from "react";

interface ExchangeIdDocumentCapturePageProps {
  params: Promise<{
    name: string;
  }>;
}

function IDCaptureAnimation() {
  const [step, setStep] = useState<"front" | "capturing" | "back">("front");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const cycle = () => {
      // 전면 표시 (2초)
      setStep("front");
      
      // 촬영 중 (2초 후)
      setTimeout(() => {
        setStep("capturing");
      }, 2000);
      
      // 플래시 및 후면 전환 (4초 후)
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 200);
        setStep("back");
      }, 4000);
      
      // 후면 플래시 및 전면으로 복귀 (7초 후)
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 200);
        setStep("front");
      }, 7000);
    };

    cycle();
    const interval = setInterval(cycle, 7000);

    return () => clearInterval(interval);
  }, []);

  const isFront = step === "front" || step === "capturing";

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 카메라 뷰파인더 */}
      <div className="relative bg-gray-800 rounded-2xl p-6 overflow-hidden">
        {/* 스캔 라인 애니메이션 */}
        {step === "capturing" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute left-0 right-0 h-0.5 bg-blue-500 opacity-70 scan-line-animation" />
          </div>
        )}

        {/* 신분증 프레임 */}
        <div className="relative bg-white rounded-lg p-4 shadow-2xl mx-auto max-w-xs">
          {/* 신분증 내용 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 min-h-[220px] flex flex-col">
            {isFront ? (
              <>
                {/* 전면 */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* 상단 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="text-[10px] text-gray-600 font-mono text-right leading-tight">
                      REPUBLIC<br />OF KOREA
                    </div>
                  </div>
                  
                  {/* 정보 라인 */}
                  <div className="space-y-2 mb-4">
                    <div className="h-2.5 bg-gray-400 rounded w-full"></div>
                    <div className="h-2.5 bg-gray-400 rounded w-4/5"></div>
                    <div className="h-2.5 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-2.5 bg-gray-400 rounded w-5/6 mt-3"></div>
                  </div>
                  
                  {/* 하단 텍스트 */}
                  <div className="text-center text-[10px] text-gray-500 font-semibold mt-auto">
                    ID CARD
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 후면 */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* 주소 섹션 */}
                  <div className="bg-gray-200 rounded-lg p-3 mb-3">
                    <div className="text-[10px] text-gray-600 font-semibold mb-1.5 text-center">
                      주소
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-4/5 mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* 추가 정보 그리드 */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="h-10 bg-gray-200 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  
                  {/* 하단 텍스트 */}
                  <div className="text-center text-[10px] text-gray-500 font-semibold mt-auto">
                    BACK SIDE
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 프레임 가이드 라인 */}
          <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none opacity-50"></div>
        </div>

        {/* 촬영 버튼 */}
        <div className="flex justify-center mt-6">
          <div className="relative">
            <button
              className={`w-16 h-16 rounded-full border-4 transition-all ${
                step === "capturing"
                  ? "bg-blue-500 border-blue-300 scale-110"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="w-full h-full rounded-full bg-white"></div>
            </button>
            {step === "capturing" && (
              <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
            )}
          </div>
        </div>

        {/* 안내 텍스트 */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            {isFront ? "전면 사진을 촬영해주세요" : "후면 사진을 촬영해주세요"}
          </p>
        </div>
      </div>

      {/* 플래시 효과 */}
      {flash && (
        <div className="absolute inset-0 bg-white flash-animation pointer-events-none rounded-2xl"></div>
      )}
    </div>
  );
}

export default function ExchangeIdDocumentCapturePage({
  params,
}: ExchangeIdDocumentCapturePageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  return (
    <>
      {/* 상단 텍스트 - 왼쪽 정렬 */}
      <div className="flex flex-col items-start gap-2 p-6">
        <p className="text-sm text-gray-400">해외 거래소 가입하기</p>
        <h1 className="text-2xl font-bold text-white">
          신분증을 촬영해주세요.
        </h1>
        <p className="text-sm text-blue-500">
          카메라 프레임 안에 신분증이 잘 보이도록 맞춰주세요!
        </p>
      </div>
      <div className="w-70 mx-auto px-4">
        <IDCaptureAnimation />

        <FixedBottomButton
          href={`/exchange/complete/${name}`}
          bgOpacity={90}
        >
          다음
        </FixedBottomButton>
      </div>
    </>
  );
}

