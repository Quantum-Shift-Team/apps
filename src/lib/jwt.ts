import { SignJWT, jwtVerify } from "jose";

// JWT 시크릿 키 (환경 변수에서 가져오거나 기본값 사용)
const getSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET || "welmnsacjknaskjdnfdsafamsc";
  return new TextEncoder().encode(secret);
};

export interface JWTPayload {
  userId: string;
  kakaoId?: string;
  email?: string;
  [key: string]: unknown;
}

/**
 * JWT 토큰 생성
 * @param payload - JWT에 포함할 페이로드 데이터
 * @param expiresIn - 토큰 만료 시간 (예: "7d", "24h", "1h")
 * @returns 생성된 JWT 토큰
 */
export async function signToken(
  payload: JWTPayload,
  expiresIn: string = "7d"
): Promise<string> {
  const secret = getSecret();
  const iat = Math.floor(Date.now() / 1000);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(iat)
    .setExpirationTime(expiresIn)
    .sign(secret);

  return token;
}

/**
 * JWT 토큰 검증
 * @param token - 검증할 JWT 토큰
 * @returns 검증된 페이로드 데이터 또는 null
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);

    return payload as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

/**
 * 요청 헤더에서 JWT 토큰 추출
 * @param authHeader - Authorization 헤더 값 (예: "Bearer <token>")
 * @returns 추출된 토큰 또는 null
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7);
}

