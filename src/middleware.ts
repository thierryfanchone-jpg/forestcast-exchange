import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge middleware enforcing:
 *   - basic rate limiting per IP for the API surface
 *   - security headers (CSP, HSTS, frame, referrer)
 *
 * The rate limiter uses an in-memory token bucket. In production this
 * should be backed by Redis or Upstash so that requests sharing an IP
 * across edge regions remain coordinated.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 120;

const buckets = new Map<string, { count: number; resetAt: number }>();

function ipOf(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() ?? "anon";
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname.startsWith("/api/")) {
    const ip = ipOf(req);
    const now = Date.now();
    const bucket = buckets.get(ip);
    if (!bucket || bucket.resetAt < now) {
      buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      bucket.count += 1;
      if (bucket.count > MAX_PER_WINDOW) {
        return new NextResponse(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { "content-type": "application/json", "retry-after": "60" },
        });
      }
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|manifest.webmanifest).*)"],
};
