import { cookies } from "next/headers";
import { BackHeader } from "@/components/layout/BackHeader";
import { db } from "@/lib/db";
import { ProfileContent } from "@/components/ui/ProfileContent";
import { verifyTokenFromCookieValue } from "@/lib/auth-middleware";

export default async function MyPage() {
  // 쿠키에서 JWT 토큰 가져오기
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  // JWT 토큰 검증
  const userPayload = await verifyTokenFromCookieValue(authToken);

  if (!userPayload || !userPayload.userId) {
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
    where: { id: userPayload.userId },
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
        <ProfileContent user={user} />
      </div>
    </div>
  );
}
