import { describe, expect, it } from "vitest";
import { cn, formatNumber } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", undefined, "font-bold")).toBe("text-sm font-bold");
  });
});

describe("formatNumber", () => {
  it("formats numbers using the given locale", () => {
    expect(formatNumber(1234, "en")).toBe("1,234");
  });
});
