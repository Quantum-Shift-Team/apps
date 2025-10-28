"use client";

import Link from "next/link";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { UserButton } from "./UserButton";

export function Header() {
  return (
    <header 
      className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-50 md:relative md:z-auto"
      style={{ height: `${LAYOUT_CONSTANTS.HEADER_HEIGHT * 0.25}rem` }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* 모바일 햄버거 메뉴 + 로고 영역 */}
          <div className="flex items-center space-x-4">
            {/* 모바일 햄버거 메뉴 버튼 */}
            <Link
              href="/sidebar"
              className="md:hidden p-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="메뉴 열기"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Link>

            {/* 로고 */}
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
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

          {/* 모바일 로그인/마이페이지 아이콘 */}
          <div className="md:hidden h-6">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
