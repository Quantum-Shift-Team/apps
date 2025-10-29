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
    const { phoneNumber } = body;

    if (!phoneNumber || typeof phoneNumber !== "string") {
      return NextResponse.json(
        { error: "전화번호가 필요합니다." },
        { status: 400 }
      );
    }

    // 전화번호 길이 검증
    if (phoneNumber.trim().length === 0) {
      return NextResponse.json(
        { error: "전화번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 전화번호 업데이트
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { phoneNumber },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("전화번호 업데이트 오류:", error);
    return NextResponse.json(
      { error: "전화번호 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

