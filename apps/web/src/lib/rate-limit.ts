import "server-only";

// Fixed-window counter in memory. Each server instance keeps its own counts.
// Production: use a shared store such as Redis so all instances enforce one limit.
const windows = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = windows.get(key);

  if (!current || now >= current.resetAt) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      limited: true,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return { limited: false, retryAfterSeconds: 0 };
}
