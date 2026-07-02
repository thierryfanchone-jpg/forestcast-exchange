import { describe, expect, it } from "vitest";
import { caribbeanEarthquakes, allEarthquakes, magnitudeTier } from "@/lib/demo-data/earthquakes";

describe("magnitudeTier", () => {
  it("classifies magnitudes into the correct tier", () => {
    expect(magnitudeTier(2.9)).toBe("low");
    expect(magnitudeTier(4.0)).toBe("moderate");
    expect(magnitudeTier(5.5)).toBe("high");
    expect(magnitudeTier(7.0)).toBe("severe");
  });
});

describe("demo earthquake dataset", () => {
  it("only contains caribbean-region events in caribbeanEarthquakes", () => {
    expect(caribbeanEarthquakes.every((e) => e.region === "caribbean")).toBe(true);
  });

  it("has unique event ids", () => {
    const ids = allEarthquakes.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps magnitudes within a plausible physical range", () => {
    expect(allEarthquakes.every((e) => e.magnitude > 0 && e.magnitude <= 10)).toBe(true);
  });
});
