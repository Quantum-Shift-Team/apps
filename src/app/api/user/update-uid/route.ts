import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getTokenFromCookie } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  try {
    // JWT 토큰에서 사용자 정보 추출
    const userPayload = await getTokenFromCookie(request, "auth-token");

    if (!userPayload || !userPayload.userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const userId = userPayload.userId;

    const body = await request.json();
    const { uid } = body;

    if (!uid || typeof uid !== "string") {
      return NextResponse.json(
        { error: "UID가 필요합니다." },
        { status: 400 }
      );
    }

    // UID 중복 확인
    const existingUser = await db.user.findFirst({
      where: {
        uid,
        id: { not: userId }, // 자기 자신 제외
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 UID입니다." },
        { status: 409 }
      );
    }

    // UID 업데이트
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { uid },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("UID 업데이트 오류:", error);
    return NextResponse.json(
      { error: "UID 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

