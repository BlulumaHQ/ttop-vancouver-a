const PLATFORM_HOST_SUFFIXES = ["lovable.app", "workers.dev", "pages.dev", "netlify.app"] as const;

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

function normalizeHostname(value: string | null): string {
  if (!value) return "";
  try {
    return new URL(`http://${value.trim()}`).hostname.replace(/\.$/, "").toLowerCase();
  } catch {
    return "";
  }
}

export function isPlatformHostname(hostname: string): boolean {
  const normalized = normalizeHostname(hostname);
  return PLATFORM_HOST_SUFFIXES.some(
    (suffix) => normalized === suffix || normalized.endsWith(`.${suffix}`),
  );
}

export function getIncomingHostname(request: Request): string {
  const requestHostname = normalizeHostname(new URL(request.url).hostname);

  // The local preview proxy supplies the public hostname separately. On real
  // deployments the request URL is authoritative, so a spoofed forwarding
  // header cannot make a custom-domain response noindex.
  if (LOCAL_HOSTNAMES.has(requestHostname)) {
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0];
    return normalizeHostname(forwardedHost ?? null) || requestHostname;
  }

  return requestHostname;
}

export function applyPlatformNoindex(request: Request, response: Response): Response {
  const contentType = response.headers.get("content-type") ?? "";
  if (
    !contentType.toLowerCase().includes("text/html") ||
    !isPlatformHostname(getIncomingHostname(request))
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  const existingPolicy = headers.get("x-robots-tag") ?? "";
  const hasNoindex = existingPolicy
    .split(",")
    .some((directive) => directive.trim().toLowerCase() === "noindex");
  if (!hasNoindex) headers.append("x-robots-tag", "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
