// Preview-only shim for the official `cloudflare:workers` module.
// Values are resolved on access and this module is never used in production builds.
export const env: Record<string, unknown> = new Proxy(
  {},
  {
    get(_target, property) {
      return typeof property === "string" ? process.env[property] : undefined;
    },
  },
);
