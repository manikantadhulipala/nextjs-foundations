import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAuth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

// 1. Input validation: reject anything outside the expected shape
const TransactionSchema = z.object({
  userId: z.string().uuid(),
  amount: z.number().positive().max(10000),
});

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  try {
    // 2. Rate limit by IP (10 requests per minute)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const limit = checkRateLimit(`transactions:${ip}`, 10, 60_000);
    if (limit.limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSeconds) },
        }
      );
    }

    // 3. Validate the body (safeParse never throws on bad input)
    const body = await request.json().catch(() => null);
    const parsed = TransactionSchema.safeParse(body);
    if (!parsed.success) {
      console.error(
        `[req-${requestId}] Validation failed:`,
        parsed.error.flatten()
      );
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // 4. Authentication: who is calling?
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 5. Authorization: users can only create transactions for themselves
    if (user.id !== parsed.data.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 6. Process the transaction (mock)
    return NextResponse.json({
      success: true,
      transactionId: randomUUID(),
      timestamp: Date.now(),
    });
  } catch (error) {
    // Details go to the server log only; the client gets a generic message
    console.error(`[req-${requestId}] Transaction failed:`, error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export function GET() {
  // Mock transaction list
  return NextResponse.json({
    transactions: [
      { id: "1", amount: 100, status: "completed" },
      { id: "2", amount: 250, status: "pending" },
    ],
  });
}
