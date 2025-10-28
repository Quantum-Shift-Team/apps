import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  
  if (!kakaoJsKey) {
    return NextResponse.json(
      { error: "KAKAO_JS_KEY is not set" },
      { status: 500 }
    );
  }

  const redirectUri = `${request.nextUrl.origin}/api/auth/kakao`;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoJsKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

  return NextResponse.json({ authUrl: kakaoAuthUrl });
}

