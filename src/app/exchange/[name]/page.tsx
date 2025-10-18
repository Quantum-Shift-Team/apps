"use client";

import { EXCHANGES } from "@/lib/exchanges";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";

interface ExchangePageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function ExchangePage({ params }: ExchangePageProps) {
  const { name } = use(params);
  const exchange = EXCHANGES.find(
    (ex) => ex.id.toLowerCase() === name.toLowerCase()
  );

  if (!exchange) {
    notFound();
  }

  return (
    <>
      <div className="px-6 py-6 space-y-8">
        {/* 상단 헤더 */}
        <div className="flex items-end gap-3 mb-3">
          {exchange.logo.endsWith('.svg') || exchange.logo.endsWith('.png') ? (
            <Image 
              src={exchange.logo}
              alt={exchange.name}
              width={48}
              height={48}
              className={exchange.logoSize}
            />
          ) : (
            <span className={`font-tossface ${exchange.logoSize}`}>{exchange.logo}</span>
          )}
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-white leading-none">{exchange.name}</h1>
            <p className="text-sm text-gray-400 leading-none">에서 거래하면</p>
          </div>
        </div>

        {/* 페이백 정보 */}
        <div>
          <p className="text-2xl font-bold text-white mb-2">
            전체 수수료 중 <span className="text-blue-400">{exchange.paybackRate}%</span>를 돌려 받아요
          </p>
          <p className="text-sm text-gray-400">페이백 받는 시간 &gt;</p>
        </div>

        {/* 토스 아이콘 애니메이션 영역 */}
        <div className="flex justify-center items-center pt-10 relative overflow-hidden">
          {/* 떨어지는 토스 아이콘들 */}
          <div className="relative w-100 h-70">
            {/* 메인 토스 아이콘 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-tossface text-9xl animate-bounce">💰</span>
            </div>
            
            {/* 떨어지는 작은 아이콘들 */}
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 font-tossface text-3xl animate-fall-1">💸</span>
            <span className="absolute top-1 left-1/4 font-tossface text-2xl animate-fall-2">💵</span>
            <span className="absolute top-2 right-1/4 font-tossface text-3xl animate-fall-3">💴</span>
            <span className="absolute top-3 left-3/4 font-tossface text-xl animate-fall-4">💶</span>
            <span className="absolute top-4 right-1/3 font-tossface text-2xl animate-fall-5">💷</span>
            <span className="absolute top-5 left-1/6 font-tossface text-2xl animate-fall-6">💸</span>
            <span className="absolute top-6 right-1/6 font-tossface text-xl animate-fall-7">💵</span>
            <span className="absolute top-7 left-2/3 font-tossface text-3xl animate-fall-8">💴</span>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes fall-1 {
            0% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(180px) rotate(360deg); opacity: 0; }
          }
          @keyframes fall-2 {
            0% { transform: translateY(-25px) rotate(0deg); opacity: 0; }
            25% { opacity: 1; }
            100% { transform: translateY(160px) rotate(-360deg); opacity: 0; }
          }
          @keyframes fall-3 {
            0% { transform: translateY(-35px) rotate(0deg); opacity: 0; }
            15% { opacity: 1; }
            100% { transform: translateY(170px) rotate(180deg); opacity: 0; }
          }
          @keyframes fall-4 {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translateY(150px) rotate(-180deg); opacity: 0; }
          }
          @keyframes fall-5 {
            0% { transform: translateY(-28px) rotate(0deg); opacity: 0; }
            22% { opacity: 1; }
            100% { transform: translateY(165px) rotate(270deg); opacity: 0; }
          }
          @keyframes fall-6 {
            0% { transform: translateY(-22px) rotate(0deg); opacity: 0; }
            18% { opacity: 1; }
            100% { transform: translateY(155px) rotate(-270deg); opacity: 0; }
          }
          @keyframes fall-7 {
            0% { transform: translateY(-26px) rotate(0deg); opacity: 0; }
            24% { opacity: 1; }
            100% { transform: translateY(160px) rotate(180deg); opacity: 0; }
          }
          @keyframes fall-8 {
            0% { transform: translateY(-24px) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(170px) rotate(-180deg); opacity: 0; }
          }
          .animate-fall-1 {
            animation: fall-1 3s infinite ease-in;
            animation-delay: 0s;
          }
          .animate-fall-2 {
            animation: fall-2 3s infinite ease-in;
            animation-delay: 0.4s;
          }
          .animate-fall-3 {
            animation: fall-3 3s infinite ease-in;
            animation-delay: 0.8s;
          }
          .animate-fall-4 {
            animation: fall-4 3s infinite ease-in;
            animation-delay: 1.2s;
          }
          .animate-fall-5 {
            animation: fall-5 3s infinite ease-in;
            animation-delay: 1.6s;
          }
          .animate-fall-6 {
            animation: fall-6 3s infinite ease-in;
            animation-delay: 2s;
          }
          .animate-fall-7 {
            animation: fall-7 3s infinite ease-in;
            animation-delay: 2.4s;
          }
          .animate-fall-8 {
            animation: fall-8 3s infinite ease-in;
            animation-delay: 2.8s;
          }
        `}</style>
      </div>
      
      {/* 하단 고정 버튼 영역 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <button className="w-[90%] py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
              거래소 가입하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
