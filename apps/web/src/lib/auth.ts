import "server-only";
import type { NextRequest } from "next/server";

export type AuthUser = { id: string; role: "user" };

// Demo verifier: accepts any Bearer token and returns a mock user.
// In production, verify a signed token or session here (for example, a JWT or your auth provider).
export async function verifyAuth(
  request: NextRequest
): Promise<AuthUser | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return { id: "123e4567-e89b-12d3-a456-426614174000", role: "user" };
}
