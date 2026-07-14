import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("mobile layered folder layout", () => {
  it("anchors cumulative folder layers and opens them upward", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
    const component = readFileSync(
      new URL("./PortfolioFolderIndex.tsx", import.meta.url),
      "utf8",
    );

    expect(css).toContain("--mobile-stack-step:");
    expect(css).toContain("--mobile-open-rise:");
    expect(css).toContain(
      "transform: translate3d(0, calc(-1 * var(--mobile-open-rise)), 0);",
    );
    expect(css).toContain(
      "transition: transform var(--motion-folder) var(--motion-ease);",
    );
    expect(component).toContain("data-active-index={activeFolderIndex}");
  });
});
