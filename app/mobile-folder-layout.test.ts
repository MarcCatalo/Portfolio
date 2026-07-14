import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("mobile layered folder layout", () => {
  it("anchors stationary folder layers beneath the opening paper", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
    const component = readFileSync(
      new URL("./PortfolioFolderIndex.tsx", import.meta.url),
      "utf8",
    );

    expect(css).toContain("--mobile-stack-step:");
    expect(css).toContain("--mobile-sheet-top:");
    expect(css).toContain(
      ".folder-slot-extended {\n    transform: none;",
    );
    expect(css).toContain("clip-path: var(--mobile-genie-open);");
    expect(component).toContain("data-active-index={activeFolderIndex}");
  });
});
