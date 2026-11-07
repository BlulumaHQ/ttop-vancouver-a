declare module "cloudflare:workers" {
  /** Nitro externalizes this official Workers module in production and shims it in development. */
  export const env: Record<string, unknown>;
}
