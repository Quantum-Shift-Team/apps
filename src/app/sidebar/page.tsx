"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-900">
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
      <div className="flex-1 flex items-center justify-center">
        <nav className="w-full max-w-sm p-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 text-center"
              >
                <div className="flex items-center justify-center space-x-3">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-lg">홈</span>
                </div>
              </Link>
            </li>
            
            <li>
              <Link
                href="/calculator"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 text-center"
              >
                <div className="flex items-center justify-center space-x-3">
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
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-lg">수수료 계산기</span>
                </div>
              </Link>
            </li>
            
            <li>
              <Link
                href="/ai-trading"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 text-center"
              >
                <div className="flex items-center justify-center space-x-3">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-lg">AI 스켈핑 매매</span>
                </div>
              </Link>
            </li>
            
            <li>
              <Link
                href="/login"
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 text-center"
              >
                <div className="flex items-center justify-center space-x-3">
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
                  <span className="text-lg">로그인</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* 하단 정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800">
        <div className="text-center text-gray-400 text-sm">
          <p>Quantum Shift</p>
          <p className="mt-1">암호화폐 거래소 비교 플랫폼</p>
        </div>
      </div>
    </div>
  );
}
