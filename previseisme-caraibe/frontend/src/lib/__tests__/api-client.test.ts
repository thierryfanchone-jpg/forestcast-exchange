import { describe, expect, it } from "vitest";
import { fetchSeismicEvents, isBackendConfigured } from "@/lib/api-client";

describe("api-client (mode démonstration)", () => {
  it("indique que le backend n'est pas configuré par défaut en test", () => {
    expect(isBackendConfigured).toBe(false);
  });

  it("retombe sur les données de démonstration et filtre par région", async () => {
    const { events, isDemo } = await fetchSeismicEvents({ region: "caraibes" });
    expect(isDemo).toBe(true);
    expect(events.length).toBeGreaterThan(0);
    expect(events.every((e) => e.region === "caraibes")).toBe(true);
  });

  it("filtre par magnitude minimale", async () => {
    const { events } = await fetchSeismicEvents({ minMagnitude: 5 });
    expect(events.every((e) => e.magnitude >= 5)).toBe(true);
  });
});
