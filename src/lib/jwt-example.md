# JWT 구현 사용 가이드

## 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```env
JWT_SECRET=your-super-secret-key-change-in-production
```

## 사용 방법

### 1. JWT 토큰 생성

```typescript
import { signToken } from "@/lib/jwt";

const token = await signToken({
  userId: "user123",
  kakaoId: "kakao456",
}, "7d"); // 7일 유효
```

### 2. JWT 토큰 검증

```typescript
import { verifyToken } from "@/lib/jwt";

const payload = await verifyToken(token);
if (payload) {
  console.log("User ID:", payload.userId);
}
```

### 3. API 라우트에서 인증 사용

#### 방법 1: requireAuth 사용 (인증 필수)

```typescript
import { requireAuth } from "@/lib/auth-middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  
  if (authResult.error) {
    return authResult.error; // 401 응답
  }
  
  const { user } = authResult;
  // user.userId, user.kakaoId 등을 사용
  return NextResponse.json({ userId: user.userId });
}
```

#### 방법 2: getAuthenticatedUser 사용 (선택적 인증)

```typescript
import { getAuthenticatedUser } from "@/lib/auth-middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  
  if (!user) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }
  
  return NextResponse.json({ userId: user.userId });
}
```

### 4. 클라이언트에서 토큰 전송

#### Authorization 헤더 사용:

```typescript
fetch("/api/protected", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

#### 쿠키 사용 (자동):

```typescript
// 로그인 시 쿠키에 자동 저장됨
fetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ userId: "123", kakaoId: "456" })
});
```

## API 엔드포인트

### POST /api/auth/login
사용자 로그인 및 JWT 토큰 발급

```json
// Request
{
  "userId": "user123",
  "kakaoId": "kakao456"
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user123",
    "kakaoId": "kakao456"
  }
}
```

### GET /api/auth/verify
JWT 토큰 검증

```json
// Response (성공)
{
  "success": true,
  "user": {
    "userId": "user123",
    "kakaoId": "kakao456"
  }
}

// Response (실패)
{
  "error": "인증이 필요합니다."
}
```

### GET /api/auth/check
인증 상태 확인

```json
// Response
{
  "isLoggedIn": true,
  "userId": "user123"
}
```

### POST /api/auth/logout
로그아웃 (쿠키에서 토큰 제거)

```json
// Response
{
  "success": true,
  "message": "로그아웃되었습니다."
}
```

