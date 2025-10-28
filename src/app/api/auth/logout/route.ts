import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  
  // 쿠키 삭제
  response.cookies.delete("user_id");
  
  return response;
}

