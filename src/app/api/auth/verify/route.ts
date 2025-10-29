import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

/**
 * JWT 토큰 검증 API
 * GET /api/auth/verify
 */
export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);

  if (authResult.error) {
    return authResult.error;
  }

  return NextResponse.json({
    success: true,
    user: {
      userId: authResult.user.userId,
      kakaoId: authResult.user.kakaoId,
    },
  });
}

