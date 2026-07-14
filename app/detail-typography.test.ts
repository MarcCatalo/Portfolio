import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("folder detail typography", () => {
  it("uses the two-pixel readability increase across detail text levels", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toContain("font-size: 13px;");
    expect(css).toContain(
      "font-size: clamp(36px, calc(2.9vw + 2px), 44px);",
    );
    expect(css).toContain(
      "font-size: clamp(23px, calc(1.7vw + 2px), 27px);",
    );
    expect(css).toContain("font-size: 15px;");
    expect(css).toContain("font-size: 22px;");
    expect(css).toContain("font-size: 18px;");
    expect(css).toContain("font-size: 17px;");
  });
});
