"use client";

import Link from "next/link";
import Image from "next/image";
import { EXCHANGES } from "@/lib/exchanges";
import { LAYOUT_CONSTANTS } from "@/lib/constants";

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_your_channel_id";
const TELEGRAM_URL = "https://t.me/your_telegram_channel";
const TOP_OFFSET_REM = (LAYOUT_CONSTANTS.HEADER_HEIGHT + 7) * 0.25;

export function Sidebar() {
  return (
    <aside
      className="hidden md:flex md:flex-col fixed left-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto"
      style={{ top: `${TOP_OFFSET_REM}rem` }}
    >
      <nav className="px-4 pb-6 space-y-6 text-gray-300">
        <div>
          <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">
            고객센터
          </h2>
          <ul className="space-y-1">
            <li>
              <a
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-tossface text-base">💬</span>
                  <span className="text-sm">카카오톡 문의하기</span>
                </div>
              </a>
            </li>
            <li>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
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
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-tossface text-base">📢</span>
                  <span className="text-sm">공지사항</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">
            거래소
          </h2>
          <ul className="space-y-1">
            {EXCHANGES.map((exchange) => (
              <li key={exchange.id}>
                <Link
                  href={`/exchange/${exchange.id}`}
                  className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
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

        <div>
          <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">
            메뉴
          </h2>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
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
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
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
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
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
                className="block px-3 py-2 rounded-lg transition-colors text-left hover:bg-gray-800 hover:text-white"
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

      <div className="mt-auto px-4 py-3 border-t border-gray-800 text-xs text-gray-500">
        <p className="leading-relaxed">
          암호화폐 거래소 비교 플랫폼 version 1.0.0
        </p>
      </div>
    </aside>
  );
}


