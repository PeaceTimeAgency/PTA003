import { NextRequest, NextResponse } from "next/server";
import { exchangeTikTokCode } from "@/lib/tiktok";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const savedState = req.cookies.get("tiktok_oauth_state")?.value;

  // State verification (optional for mock, recommended for prod)
  // if (!state || state !== savedState) {
  //   return NextResponse.redirect(new URL("/apply?error=invalid_state", req.url));
  // }

  if (!code) {
    return NextResponse.redirect(new URL("/apply?error=no_code", req.url));
  }

  try {
    const tokenData = await exchangeTikTokCode(code);
    
    // In this implementation, we'll return the user to /auth-success with the token in a temporary cookie
    // or as a query param (cookie is safer). Let's use a temporary cookie for simplicity.
    const response = NextResponse.redirect(new URL("/auth-success", req.url));
    response.cookies.set("tiktok_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("TikTok Auth Error:", error);
    return NextResponse.redirect(new URL("/apply?error=auth_failed", req.url));
  }
}
