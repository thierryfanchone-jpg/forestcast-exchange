import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MagnitudeBadge } from "@/components/events/magnitude-badge";

describe("MagnitudeBadge", () => {
  it("affiche la magnitude formatée et le libellé", () => {
    render(<MagnitudeBadge magnitude={5.2} />);
    expect(screen.getByText("M 5.2")).toBeInTheDocument();
    expect(screen.getByText("Fort")).toBeInTheDocument();
  });
});
