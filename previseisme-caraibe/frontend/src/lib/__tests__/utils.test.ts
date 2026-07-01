import { describe, expect, it } from "vitest";
import { formatMagnitude, magnitudeLabel, cn } from "@/lib/utils";

describe("formatMagnitude", () => {
  it("formate avec une décimale", () => {
    expect(formatMagnitude(4.567)).toBe("4.6");
    expect(formatMagnitude(5)).toBe("5.0");
  });
});

describe("magnitudeLabel", () => {
  it.each([
    [2.5, "Mineur"],
    [3.5, "Léger"],
    [4.5, "Modéré"],
    [5.5, "Fort"],
    [7, "Majeur"],
  ])("magnitude %s -> %s", (magnitude, expected) => {
    expect(magnitudeLabel(magnitude)).toBe(expected);
  });
});

describe("cn", () => {
  it("fusionne et dédoublonne les classes tailwind", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", undefined, "font-bold")).toBe("text-sm font-bold");
  });
});
