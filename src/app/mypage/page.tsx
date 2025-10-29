import { cookies } from "next/headers";
import Image from "next/image";
import { BackHeader } from "@/components/layout/BackHeader";
import { db } from "@/lib/db";
import { UidSection } from "@/components/ui/UidSection";

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
      <BackHeader backLink="/" />
      <div className="min-h-screen py-12 px-4 pt-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">마이페이지</h1>

          <div className="bg-gray-800 rounded-lg p-8 space-y-6">
            {/* 프로필 이미지 */}
            {user.profileImage && (
              <div className="flex justify-center">
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

            {/* 닉네임 */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">닉네임</label>
              <div className="text-xl font-semibold text-white">
                {user.nickname || "설정되지 않음"}
              </div>
            </div>

            {/* 이메일 */}
            {user.email && (
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  이메일
                </label>
                <div className="text-white">{user.email}</div>
              </div>
            )}

            {/* 카카오 ID */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                카카오 ID
              </label>
              <div className="text-white font-mono">{user.kakaoId}</div>
            </div>

            {/* UID */}
            <div>
              <UidSection userId={user.id} initialUid={user.uid} />
            </div>

            {/* 생성일 */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">가입일</label>
              <div className="text-white">
                {user.createdAt.toLocaleString("ko-KR")}
              </div>
            </div>

            {/* 로그아웃 버튼 */}
            <div className="pt-6 border-t border-gray-700">
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
