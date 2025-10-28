import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // 에러 처리
  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=no_code", request.url)
    );
  }

  try {
    const kakaoRestApiKey = process.env.KAKAO_REST_API_KEY;
    const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI || `${request.nextUrl.origin}/api/auth/kakao`;

    console.log("Kakao Login - KAKAO_REST_API_KEY:", kakaoRestApiKey?.substring(0, 5) + "...");
    console.log("Kakao Login - Redirect URI:", kakaoRedirectUri);
    console.log("Kakao Login - Code:", code);

    if (!kakaoRestApiKey) {
      throw new Error("KAKAO_REST_API_KEY is not set");
    }

    // 카카오 토큰 요청
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: kakaoRestApiKey,
        redirect_uri: kakaoRedirectUri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Kakao token error:", errorText);
      console.error("Status:", tokenResponse.status);
      console.error("KAKAO_REST_API_KEY:", kakaoRestApiKey?.substring(0, 5) + "...");
      throw new Error("Failed to get token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 사용자 정보 가져오기
    const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to get user info");
    }

    const userData = await userResponse.json();

    // DB에 사용자 저장 또는 업데이트
    const user = await db.user.upsert({
      where: { kakaoId: userData.id.toString() },
      update: {
        nickname: userData.kakao_account.profile?.nickname,
        email: userData.kakao_account.email,
        profileImage: userData.kakao_account.profile?.profile_image_url,
      },
      create: {
        kakaoId: userData.id.toString(),
        nickname: userData.kakao_account.profile?.nickname,
        email: userData.kakao_account.email,
        profileImage: userData.kakao_account.profile?.profile_image_url,
      },
    });

    // 세션 생성
    const response = NextResponse.redirect(
      new URL("/", request.url)
    );

    // DB의 user id를 쿠키에 저장
    response.cookies.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (error) {
    console.error("Kakao login error:", error);
    return NextResponse.redirect(
      new URL("/login?error=login_failed", request.url)
    );
  }
}

