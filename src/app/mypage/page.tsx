import { cookies } from "next/headers";
import { BackHeader } from "@/components/layout/BackHeader";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function MyPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">로그인이 필요합니다.</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            로그인하기
          </a>
        </div>
      </div>
    );
  }

  // DB에서 유저 정보 가져오기
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">유저 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <BackHeader
        backLink="/"
        title={`${user.nickname || "사용자"}님의 정보`}
      />
      <div className="mt-16">
        {/* 프로필 이미지 */}
        {user.profileImage && (
          <div className="flex justify-center py-6">
            <Image
              src={user.profileImage}
              alt="프로필"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="space-y-1">
          {/* 닉네임 */}
          <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-gray-400">닉네임</span>
            <div className="flex items-center space-x-2">
              <span className="text-white">
                {user.nickname || "설정되지 않음"}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-gray-400">이메일</span>
            <div className="flex items-center space-x-2">
              <span className="text-white">{user.email || "없음"}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* 카카오 ID */}
          <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-gray-400">카카오 ID</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-mono">{user.kakaoId}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* UID */}
          <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-gray-400">UID</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-mono">
                {user.uid || "등록되지 않음"}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* 가입일 */}
          <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors">
            <span className="text-gray-400">가입일</span>
            <div className="flex items-center space-x-2">
              <span className="text-white">
                {user.createdAt.toLocaleDateString("ko-KR")}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
