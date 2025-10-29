import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nickname } = body;

    if (!nickname || typeof nickname !== "string") {
      return NextResponse.json(
        { error: "닉네임이 필요합니다." },
        { status: 400 }
      );
    }

    // 닉네임 길이 검증
    if (nickname.trim().length === 0) {
      return NextResponse.json(
        { error: "닉네임을 입력해주세요." },
        { status: 400 }
      );
    }

    // 닉네임 업데이트
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { nickname },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("닉네임 업데이트 오류:", error);
    return NextResponse.json(
      { error: "닉네임 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

