"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BackHeader } from "@/components/layout/BackHeader";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleKakaoLogin = () => {
    const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    const redirectUri = `${window.location.origin}/api/auth/kakao`;
    
    if (!kakaoJsKey) {
      alert("카카오 로그인이 설정되지 않았습니다.");
      return;
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoJsKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 고정 헤더 */}
      <BackHeader backLink="/" />

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full">
          {/* 상단 영역 */}
          <div className="text-center mb-8">
            {/* <div className="mb-6">
              <span className="font-tossface text-5xl sm:text-6xl text-yellow-400">
                ⚡
              </span>
            </div> */}
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">
            ⚡ Quantum Shift
            </h1>
          </div>

          {/* 로그인 섹션 */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-2">로그인</h2>
              <p className="text-sm text-gray-400">
                카카오 계정으로 간편하게 시작하세요
              </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="text-center text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg py-2 px-4">
                로그인에 실패했습니다. 다시 시도해주세요.
              </div>
            )}

            {/* 카카오 로그인 버튼 */}
            <button 
              onClick={handleKakaoLogin}
              className="w-64 mx-auto flex justify-center items-center px-6 py-3 border border-transparent rounded-2xl shadow-xl text-base font-semibold text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none transition-all duration-200"
            >
              카카오로 로그인
            </button>

            {/* 약관 동의 */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                로그인 시{" "}
                <Link href="/terms" className="text-blue-400 underline">
                  이용약관
                </Link>{" "}
                및{" "}
                <Link href="/privacy" className="text-blue-400 underline">
                  개인정보처리방침
                </Link>
                에 동의합니다.
              </p>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              문의사항이 있으시면{" "}
              <Link href="/support" className="text-blue-400">
                고객지원
              </Link>
              으로 연락해주세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
