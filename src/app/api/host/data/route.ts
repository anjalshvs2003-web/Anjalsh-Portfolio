import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import fallbackData from "@/data/portfolioData.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolioData.json");

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContents);
    return NextResponse.json({ success: true, data: parsed });
  } catch {
    return NextResponse.json({ success: true, data: fallbackData });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterKey = process.env.HOST_PASSWORD || "anjalsh2025";

    // Validate authorization token or master key
    const isAuthorized =
      authHeader === "Bearer anjalsh_master_session_active" ||
      authHeader === `Bearer ${masterKey}`;

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access to host data." },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid data payload." },
        { status: 400 }
      );
    }

    // Write formatted JSON to file
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Could not write to disk (likely read-only serverless environment):", writeErr);
      // Return success with memory note
      return NextResponse.json({
        success: true,
        message: "Data saved in-memory and client storage.",
        persistedToDisk: false,
        data: body,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio data successfully saved and synchronized.",
      persistedToDisk: true,
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Save failed" },
      { status: 500 }
    );
  }
}
