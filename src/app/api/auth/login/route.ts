import { NextRequest, NextResponse } from "next/server";
import { signToken, JWTPayload } from "@/lib/jwt";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

/**
 * 로그인 API - JWT 토큰 발급
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kakaoId, userId } = body;

    if (!kakaoId && !userId) {
      return NextResponse.json(
        { error: "kakaoId 또는 userId가 필요합니다." },
        { status: 400 }
      );
    }

    // userId가 없으면 kakaoId로 사용자 조회
    let dbUserId = userId;
    if (!dbUserId && kakaoId) {
      const user = await db.user.findUnique({
        where: { kakaoId },
      });

      if (!user) {
        return NextResponse.json(
          { error: "사용자를 찾을 수 없습니다." },
          { status: 404 }
        );
      }

      dbUserId = user.id;
    }

    // JWT 페이로드 생성
    const payload: JWTPayload = {
      userId: dbUserId,
      kakaoId: kakaoId || undefined,
    };

    // JWT 토큰 생성 (7일 유효)
    const token = await signToken(payload, "7d");

    // 쿠키에 토큰 저장
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: "/",
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        userId: dbUserId,
        kakaoId: kakaoId || undefined,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

