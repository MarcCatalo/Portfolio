import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("desktop folder hover zone", () => {
  it("keeps a stationary hit area under each resting tab while it slides open", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8")
      .replace(/\r\n/g, "\n");
    const desktopOnly = css.match(
      /@media \(min-width: 901px\) {\s*\.folder-slot::before {([^}]*)}/,
    );

    expect(desktopOnly).not.toBeNull();
    expect(desktopOnly?.[1]).toContain("right: 0;");
    expect(desktopOnly?.[1]).toContain("width: var(--folder-spine);");
  });
});
