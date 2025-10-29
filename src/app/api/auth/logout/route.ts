import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * 로그아웃 API - 쿠키에서 토큰 제거
 * POST /api/auth/logout
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");

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
