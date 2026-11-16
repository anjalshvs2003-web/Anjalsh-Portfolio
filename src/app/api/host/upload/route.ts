import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterKey = process.env.HOST_PASSWORD || "anjalsh2025";

    const isAuthorized =
      authHeader === "Bearer anjalsh_master_session_active" ||
      authHeader === `Bearer ${masterKey}`;

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Host key required." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const extension = path.extname(originalName).toLowerCase();
    const timestamp = Date.now();
    const safeFilename = `upload_${timestamp}${extension}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, safeFilename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      type: file.type,
      message: "Media uploaded successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
