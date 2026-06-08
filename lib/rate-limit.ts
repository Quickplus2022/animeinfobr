interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory store. Works per-instance (Vercel serverless).
// Provides meaningful protection even without Redis.
const store = new Map<string, RateLimitRecord>();

// Prune expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetAt) store.delete(key);
  }
}, 300_000);

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
  remaining: number;
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((record.resetAt - now) / 1000),
      remaining: 0,
    };
  }

  record.count++;
  return { allowed: true, retryAfterSec: 0, remaining: maxRequests - record.count };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimitKey(prefix: string, request: Request): string {
  return `${prefix}:${getClientIp(request)}`;
}
