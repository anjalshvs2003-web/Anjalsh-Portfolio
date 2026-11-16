import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { key } = await request.json();
    const masterKey = process.env.HOST_PASSWORD || "anjalsh2025";

    if (!key || key.trim() !== masterKey.trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid Host Master Key. Access Denied." },
        { status: 401 }
      );
    }

    // Set secure authentication cookie
    const response = NextResponse.json({
      success: true,
      token: "anjalsh_master_session_active",
      message: "Host authenticated successfully.",
    });

    response.cookies.set("anjalsh_host_auth", "anjalsh_master_session_active", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication request failed." },
      { status: 500 }
    );
  }
}
