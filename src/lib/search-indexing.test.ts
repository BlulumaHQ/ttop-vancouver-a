import { describe, expect, test } from "bun:test";

import {
  applyPlatformNoindex,
  getIncomingHostname,
  isPlatformHostname,
} from "./search-indexing.server";

function htmlResponse(
  init: { status?: number; headers?: HeadersInit; body?: string } = {},
) {
  return new Response(init.body ?? "<html><body>Public page</body></html>", {
    status: init.status ?? 200,
    headers: { "content-type": "text/html; charset=utf-8", ...init.headers },
  });
}

describe("Platform hostname matching", () => {
  test("matches exact platform domains and every nested subdomain", () => {
    for (const domain of [
      "lovable.app",
      "preview.lovable.app",
      "deep.preview.lovable.app",
      "workers.dev",
      "ttop-vancouver-a.workers.dev",
      "pages.dev",
      "branch.ttop.pages.dev",
      "netlify.app",
      "deploy-preview.ttop.netlify.app",
      "PREVIEW.LOVABLE.APP.",
    ]) {
      expect(isPlatformHostname(domain)).toBe(true);
    }
  });

  test("never matches custom domains or lookalike hostnames", () => {
    for (const domain of [
      "ttopchicken.com",
      "www.ttopchicken.com",
      "lovable.app.evil.example",
      "evilworkers.dev",
      "notpages.dev",
      "netlify.app.evil.example",
      "localhost",
    ]) {
      expect(isPlatformHostname(domain)).toBe(false);
    }
  });
});

describe("Incoming hostname resolution", () => {
  test("uses the request URL on deployment and ignores spoofed forwarding headers", () => {
    const request = new Request("https://www.ttopchicken.com/menu", {
      headers: { "x-forwarded-host": "anything.workers.dev" },
    });
    expect(getIncomingHostname(request)).toBe("www.ttopchicken.com");
  });

  test("uses the public forwarded hostname only for local preview requests", () => {
    const request = new Request("http://localhost:8080/zh-tw/menu", {
      headers: {
        "x-forwarded-host":
          "id-preview--example.lovable.app, internal-proxy.local",
      },
    });
    expect(getIncomingHostname(request)).toBe(
      "id-preview--example.lovable.app",
    );
  });
});

describe("Domain-aware noindex responses", () => {
  test("adds noindex to HTML on every required platform domain and nested route", () => {
    for (const domain of [
      "id-preview--example.lovable.app",
      "ttop-vancouver-a.workers.dev",
      "branch.ttop.pages.dev",
      "deploy-preview.ttop.netlify.app",
    ]) {
      const response = applyPlatformNoindex(
        new Request(`https://${domain}/zh-cn/menu`),
        htmlResponse(),
      );
      expect(response.headers.get("x-robots-tag")).toBe("noindex");
    }
  });

  test("preserves response content, status and existing crawler directives", async () => {
    const response = applyPlatformNoindex(
      new Request("https://preview.lovable.app/missing"),
      htmlResponse({
        status: 404,
        headers: { "x-robots-tag": "nofollow", "x-existing": "preserved" },
        body: "<html><body>Not found</body></html>",
      }),
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("x-robots-tag")).toBe("nofollow, noindex");
    expect(response.headers.get("x-existing")).toBe("preserved");
    expect(await response.text()).toBe("<html><body>Not found</body></html>");
  });

  test("does not duplicate an existing noindex directive", () => {
    const response = applyPlatformNoindex(
      new Request("https://preview.lovable.app/"),
      htmlResponse({ headers: { "x-robots-tag": "nofollow, noindex" } }),
    );
    expect(response.headers.get("x-robots-tag")).toBe("nofollow, noindex");
  });

  test("leaves custom-domain HTML index-eligible and otherwise unchanged", () => {
    for (const domain of ["ttopchicken.com", "www.ttopchicken.com"]) {
      const original = htmlResponse();
      const response = applyPlatformNoindex(
        new Request(`https://${domain}/zh-tw/menu`),
        original,
      );
      expect(response).toBe(original);
      expect(response.headers.has("x-robots-tag")).toBe(false);
    }
  });

  test("does not add noindex to JSON, XML, robots.txt or other non-HTML responses", () => {
    for (const contentType of [
      "application/json",
      "application/xml",
      "text/plain",
      "image/png",
    ]) {
      const original = new Response("public content", {
        headers: { "content-type": contentType },
      });
      const response = applyPlatformNoindex(
        new Request("https://preview.lovable.app/robots.txt"),
        original,
      );
      expect(response).toBe(original);
      expect(response.headers.has("x-robots-tag")).toBe(false);
    }
  });

  test("keeps a custom-domain response indexable when a forwarding header is spoofed", () => {
    const response = applyPlatformNoindex(
      new Request("https://www.ttopchicken.com/", {
        headers: { "x-forwarded-host": "preview.lovable.app" },
      }),
      htmlResponse(),
    );
    expect(response.headers.has("x-robots-tag")).toBe(false);
  });
});
