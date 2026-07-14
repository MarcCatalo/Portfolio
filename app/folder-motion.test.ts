import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("desktop folder motion", () => {
  it("uses one slower duration for the folder and its sheet", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toContain("--motion-folder: 773ms;");
    expect(css).toContain(
      "transform var(--motion-folder) var(--motion-ease)",
    );
    expect(css).toContain(
      "animation: sheet-enter var(--motion-folder) var(--motion-ease) both;",
    );
  });
});
