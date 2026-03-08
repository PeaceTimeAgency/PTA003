import { NextRequest, NextResponse } from "next/server";
import { getTikTokAuthUrl } from "@/lib/tiktok";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const isMockCallback = searchParams.get("code") === "mock_code";
  
  if (isMockCallback) {
    // Already in callback flow, don't redirect again
    return NextResponse.next();
  }

  const state = Math.random().toString(36).substring(7);
  const authUrl = getTikTokAuthUrl(state);
  
  // In a real app, we'd store 'state' in a secure cookie to verify on callback
  const response = NextResponse.redirect(new URL(authUrl, req.url));
  response.cookies.set("tiktok_oauth_state", state, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });
  
  return response;
}
