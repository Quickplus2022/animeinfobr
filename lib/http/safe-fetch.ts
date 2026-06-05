const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 1;

export async function safeFetchJson<T>(
  url: string,
  options?: Omit<RequestInit, "signal"> & {
    timeoutMs?: number;
    retries?: number;
    fallback?: T;
    label?: string;
  }
): Promise<T> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
    fallback,
    label = "external-fetch",
    ...fetchOptions
  } = options ?? {};

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        console.error(`[${label}] HTTP ${response.status}`);
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
          continue;
        }
        return fallback as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeout);
      const msg = error instanceof Error ? error.message : String(error);
      if (attempt < retries) {
        console.error(`[${label}] attempt ${attempt + 1} failed: ${msg} — retrying`);
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      console.error(`[${label}] failed after ${retries + 1} attempt(s): ${msg}`);
      return fallback as T;
    }
  }

  return fallback as T;
}
