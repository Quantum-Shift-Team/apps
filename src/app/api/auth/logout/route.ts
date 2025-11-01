import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * 로그아웃 API - 쿠키에서 토큰 제거
 * POST /api/auth/logout - JSON 응답 반환
 * GET /api/auth/logout - 메인 페이지로 리다이렉트
 */
async function performLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}

export async function POST() {
  try {
    await performLogout();

    return NextResponse.json({
      success: true,
      message: "로그아웃되었습니다.",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await performLogout();
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Logout error:", error);
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
}
