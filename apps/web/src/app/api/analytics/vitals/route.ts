import { NextResponse } from "next/server";

// Receives Core Web Vitals reports from the browser
export async function POST(request: Request) {
  try {
    const vitals = await request.json();

    // Log to your analytics system (for example a database or external service)
    console.log("Core Web Vitals:", vitals);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to record vitals" },
      { status: 500 }
    );
  }
}
