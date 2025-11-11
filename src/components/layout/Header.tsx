"use client";

import Link from "next/link";
import { LAYOUT_CONSTANTS } from "@/lib/constants";
import { UserButton } from "./UserButton";

export function Header() {
  return (
    <header
      className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 right-0 z-50"
      style={{ height: `${LAYOUT_CONSTANTS.HEADER_HEIGHT * 0.25}rem` }}
    >
      <div className="px-4 md:px-8 h-full flex items-center justify-between">
        {/* 햄버거 메뉴 + 로고 영역 */}
        <div className="flex items-center space-x-4">
          {/* 햄버거 메뉴 버튼 */}
          <Link
            href="/sidebar"
            className="p-2 text-white hover:bg-gray-700 rounded-lg transition-colors md:hidden"
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

        {/* 로그인/마이페이지 아이콘 */}
        <div className="h-6">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
