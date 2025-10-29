import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader, JWTPayload } from "./jwt";

/**
 * 인증이 필요한 API 라우트에서 사용하는 미들웨어 헬퍼
 * @param request - Next.js 요청 객체
 * @returns 검증된 JWT 페이로드 또는 null
 */
export async function getAuthenticatedUser(
  request: NextRequest
): Promise<JWTPayload | null> {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

/**
 * 인증 체크 미들웨어 - 인증되지 않은 경우 401 반환
 * @param request - Next.js 요청 객체
 * @returns 인증된 사용자 정보 또는 null (401 응답은 호출자가 처리)
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ user: JWTPayload; error: null } | { user: null; error: NextResponse }> {
  const user = await getAuthenticatedUser(request);

  if (!user || !user.userId) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      ),
    };
  }

  return { user, error: null };
}

/**
 * 쿠키에서 JWT 토큰 추출 및 검증 (API Route용 - NextRequest 사용)
 * @param request - Next.js 요청 객체
 * @param cookieName - 쿠키 이름 (기본값: "auth-token")
 * @returns 검증된 JWT 페이로드 또는 null
 */
export async function getTokenFromCookie(
  request: NextRequest,
  cookieName: string = "auth-token"
): Promise<JWTPayload | null> {
  const token = request.cookies.get(cookieName)?.value;

  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

/**
 * 쿠키에서 JWT 토큰 추출 및 검증 (Server Component용 - cookies() 사용)
 * @param cookieValue - 쿠키 값
 * @returns 검증된 JWT 페이로드 또는 null
 */
export async function verifyTokenFromCookieValue(
  cookieValue: string | undefined
): Promise<JWTPayload | null> {
  if (!cookieValue) {
    return null;
  }

  return await verifyToken(cookieValue);
}

