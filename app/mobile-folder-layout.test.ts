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
    expect(css).toContain("animation: mobile-sheet-rise-open");
    expect(component).toContain("data-active-index={activeFolderIndex}");
  });

  it("uses a scrollable minimum-height canvas on short mobile viewports", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toContain("--mobile-page-min-height: 900px;");
    expect(css).toContain(
      "min-height: max(100svh, var(--mobile-page-min-height));",
    );
    expect(css).toContain("overflow-y: visible;");
    expect(css).toContain("scrollbar-width: none;");
    expect(css).toContain("body::-webkit-scrollbar");
  });

  it("reserves padding above and below the mobile folder stack", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toContain("--mobile-footer-bottom: 18px;");
    expect(css).toContain("--mobile-footer-height: 72px;");
    expect(css).toContain("--mobile-folder-gap: 18px;");
    expect(css).toContain(
      "--mobile-folder-bottom: calc(\n      var(--mobile-footer-bottom) + var(--mobile-footer-height) +\n        var(--mobile-folder-gap)\n    );",
    );
    expect(css).toContain("bottom: var(--mobile-footer-bottom);");
  });
});
