import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookie } from "@/lib/auth-middleware";

/**
 * 인증 상태 확인 API
 * GET /api/auth/check
 */
export async function GET(request: NextRequest) {
  const user = await getTokenFromCookie(request, "auth-token");

  return NextResponse.json({ 
    isLoggedIn: !!user,
    userId: user?.userId || null,
  });
}

