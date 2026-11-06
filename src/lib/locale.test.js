import { describe, expect, test } from "bun:test";
import { localizedPath, localeFromPath } from "./locale";

describe("Independent language URLs", () => {
  test("Traditional Chinese has its own home and menu URLs", () => {
    expect(localizedPath("/", "zh-TW")).toBe("/zh-tw/");
    expect(localizedPath("/menu", "zh-TW")).toBe("/zh-tw/menu");
    expect(localeFromPath("/zh-tw/menu")).toBe("zh-TW");
  });
  test("Simplified Chinese has its own home and menu URLs", () => {
    expect(localizedPath("/", "zh-CN")).toBe("/zh-cn/");
    expect(localizedPath("/zh-tw/menu", "zh-CN")).toBe("/zh-cn/menu");
    expect(localeFromPath("/zh-cn/menu")).toBe("zh-CN");
  });
  test("English URLs stay unchanged and external ordering links stay external", () => {
    expect(localizedPath("/menu", "en")).toBe("/menu");
    expect(localizedPath("https://order.chatchefs.com", "zh-TW")).toBe("https://order.chatchefs.com");
  });
});