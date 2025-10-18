"use client";

import Link from "next/link";
import { LAYOUT_CONSTANTS } from "@/lib/constants";

export function Header() {
  return (
    <header 
      className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-50 md:relative md:z-auto"
      style={{ height: `${LAYOUT_CONSTANTS.HEADER_HEIGHT * 0.25}rem` }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* 로고 영역 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="font-tossface text-2xl">⚡</span>
              <h1 className="text-xl font-bold text-white">Quantum Shift</h1>
            </Link>
          </div>

          {/* 데스크톱 로그인/회원가입 영역 */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              로그인
            </Link>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium">
              회원가입
            </button>
          </div>

          {/* 모바일 로그인 아이콘 */}
          <div className="md:hidden h-6">
            <Link
              href="/login"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
