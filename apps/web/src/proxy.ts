import { type NextRequest, NextResponse } from "next/server";
import { isKnownPostSlug } from "@/lib/posts-db";

export function proxy(request: NextRequest) {
  console.log(`[Proxy] ${request.method} ${request.nextUrl.pathname}`);

  // Unknown post slugs: rewrite to a static route that calls notFound() during
  // prerendering. That gives a real 404 that renders the nested posts/not-found.tsx.
  // Known posts pass through to the page.
  const postMatch = request.nextUrl.pathname.match(/^\/posts\/([^/]+)$/);
  if (postMatch && !isKnownPostSlug(postMatch[1] ?? "")) {
    return NextResponse.rewrite(new URL("/posts/missing", request.url));
  }

  // Create a request headers object with additional headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", crypto.randomUUID());
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  // Continue to route with modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Security headers on the response
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "X-Request-Id",
    requestHeaders.get("x-request-id") || ""
  );

  return response;
}

// Configure which paths run the proxy
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
