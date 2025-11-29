"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EXCHANGES } from "@/lib/exchanges";
import { APP_INFO } from "@/lib/constants";

export default function SidebarPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const kakaoChannelUrl = "https://pf.kakao.com/_your_channel_id";
  const telegramUrl = "https://t.me/your_telegram_channel";

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative">
      {/* 헤더 */}
      <header className="bg-gray-800 border-b border-gray-700 h-16 flex flex-col justify-center items-start">
        <div className="px-4">
          <div className="flex items-center justify-between h-full space-x-4">
            <button
              onClick={handleBack}
              className="p-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="뒤로가기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Quantum Shift</h1>
            <div className="w-10"></div> {/* 공간 확보용 */}
          </div>
        </div>
      </header>

      {/* 메뉴 리스트 */}
      <div className="flex-1 flex items-start justify-start pt-4 overflow-y-auto pb-24">
        <nav className="w-full px-4">
          {/* 고객센터 섹션 */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">
              고객센터
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href={kakaoChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">💬</span>
                    <span className="text-sm">카카오톡 문의하기</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">✈️</span>
                    <span className="text-sm">텔레그램 문의하기</span>
                  </div>
                </a>
              </li>
              <li>
                <Link
                  href="/notice"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">📢</span>
                    <span className="text-sm">공지사항</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* 거래소 목록 섹션 */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">
              거래소
            </h2>
            <ul className="space-y-1">
              {EXCHANGES.map((exchange) => (
                <li key={exchange.id}>
                  <Link
                    href={`/exchange/${exchange.id}`}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2">
                      {exchange.logo.endsWith(".svg") ||
                      exchange.logo.endsWith(".png") ? (
                        <div className="w-5 h-5 flex items-center justify-center">
                          <Image
                            src={exchange.logo}
                            alt={exchange.name}
                            width={20}
                            height={20}
                            className={exchange.logoSize}
                          />
                        </div>
                      ) : (
                        <span className={`font-tossface ${exchange.logoSize}`}>
                          {exchange.logo}
                        </span>
                      )}
                      <span className="text-sm">{exchange.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 메뉴 섹션 */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">
              메뉴
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">🏠</span>
                    <span className="text-sm">홈</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/calculator"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">🧮</span>
                    <span className="text-sm">수수료 계산기</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/ai-trading"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">🤖</span>
                    <span className="text-sm">AI 스켈핑 매매</span>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-tossface text-base">🔐</span>
                    <span className="text-sm">로그인</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* 하단 정보 */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-gray-900 z-10">
        <div className="text-gray-400 text-xs px-4">
          <p className="mt-1">{APP_INFO.getVersionText()}</p>
        </div>
      </div>
    </div>
  );
}
