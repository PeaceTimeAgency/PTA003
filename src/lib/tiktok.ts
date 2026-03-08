/**
 * TikTok API Utility Library
 * Handles OAuth 2.0 flow and user profile fetching.
 * Includes a Mock Mode for development.
 */

const TIKTOK_CLIENT_ID = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID || "mock_client_id";
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || "mock_client_secret";
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`
  : "http://localhost:3000/api/auth/tiktok/callback";

const MOCK_MODE = process.env.MOCK_TIKTOK === "true" || !process.env.TIKTOK_CLIENT_SECRET;

export interface TikTokProfile {
  open_id: string;
  union_id: string;
  avatar_url: string;
  display_name: string;
  username: string;
  follower_count?: number;
}

export function getTikTokAuthUrl(state: string) {
  if (MOCK_MODE) {
    return `/api/auth/tiktok/callback?code=mock_code&state=${state}`;
  }

  const scope = "user.info.basic,video.list,user.stats";
  const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
  url.searchParams.append("client_key", TIKTOK_CLIENT_ID);
  url.searchParams.append("scope", scope);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("redirect_uri", REDIRECT_URI);
  url.searchParams.append("state", state);
  
  return url.toString();
}

export async function exchangeTikTokCode(code: string) {
  if (MOCK_MODE) {
    return {
      access_token: "mock_access_token",
      open_id: "mock_open_id",
      expires_in: 86400,
    };
  }

  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_key: TIKTOK_CLIENT_ID,
      client_secret: TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error_description || "Failed to exchange TikTok code");
  }

  return response.json();
}

export async function getTikTokProfile(accessToken: string): Promise<TikTokProfile> {
  if (MOCK_MODE) {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    return {
      open_id: "mock_open_id",
      union_id: "mock_union_id",
      avatar_url: "https://images.unsplash.com/photo-153571501002f-bc5a2d79119a?q=80&w=100&h=100&auto=format&fit=crop",
      display_name: "Mock Creator",
      username: "mock_creator_66",
      follower_count: 54200,
    };
  }

  const response = await fetch("https://open.tiktokapis.com/v2/user/info/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch TikTok profile");
  }

  const { data } = await response.json();
  return {
    ...data.user,
    follower_count: data.user.follower_count, // TikTok API structure varies, mapping here
  };
}
