'use client'

import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 fixed top-0 left-0 right-0 z-50 md:relative md:z-auto">
      <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
        {/* 로고 영역 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-tossface text-2xl">⚡</span>
            <h1 className="text-xl font-bold text-white">Quantum Shift</h1>
          </div>
        </div>

        {/* 데스크톱 로그인/회원가입 영역 */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            로그인
          </button>
          <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium">
            회원가입
          </button>
        </div>

        {/* 모바일 햄버거 메뉴 */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            <span className="font-tossface text-2xl">☰</span>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-gray-700">
          <div className="flex space-x-3">
            <button className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium">
              로그인
            </button>
            <button className="flex-1 text-center px-4 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium">
              회원가입
            </button>
          </div>
        </div>
      )}
      </div>
    </header>
  )
}
