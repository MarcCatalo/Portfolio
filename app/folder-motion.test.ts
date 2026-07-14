import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("desktop folder motion", () => {
  it("unfolds the attached sheet in tandem with the folder tab", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toContain("--motion-folder: 773ms;");
    expect(css).toContain(
      "transform var(--motion-folder) var(--motion-ease)",
    );
    expect(css).toContain(
      "clip-path var(--motion-folder) var(--motion-ease)",
    );
    expect(css).toContain("clip-path: inset(0 0 0 100%);");
    expect(css).toContain("clip-path: inset(0);");
    expect(css).not.toContain(
      "animation: sheet-unfold var(--motion-folder) var(--motion-ease) both;",
    );
  });
});
