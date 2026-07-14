import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("desktop folder motion", () => {
  it("uses the slower folder transition duration", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toContain("--motion-folder: 644ms;");
  });
});
