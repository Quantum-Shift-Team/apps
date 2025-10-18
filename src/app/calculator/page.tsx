import { PaybackCalculator } from "../PaybackCalculator";
import Link from "next/link";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 고정 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-6 h-6 text-white"
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
            </Link>
          </div>
        </div>
      </header>

      {/* 계산기 페이지 - 헤더 높이만큼 패딩 적용 */}
      <div className="pt-12 min-h-screen flex items-start justify-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          <PaybackCalculator />
        </div>
      </div>
    </div>
  );
}
