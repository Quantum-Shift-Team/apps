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

