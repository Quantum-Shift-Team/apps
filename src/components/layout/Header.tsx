'use client'

import { Button } from '@/components/ui/Button'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 로고 영역 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-tossface text-2xl">🎯</span>
            <h1 className="text-xl font-bold text-gray-900">Quantum Shift</h1>
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            대시보드
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            프로젝트
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            팀
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            설정
          </a>
        </nav>

        {/* 사용자 영역 */}
        <div className="flex items-center space-x-4">
          {/* 알림 */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span className="font-tossface text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </button>

          {/* 프로필 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">김</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">김영진</span>
          </div>
        </div>
      </div>
    </header>
  )
}
