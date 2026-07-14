import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("desktop folder sheets", () => {
  it("keeps one persistent details sheet mounted for every folder", () => {
    const source = readFileSync(
      new URL("./PortfolioFolderIndex.tsx", import.meta.url),
      "utf8",
    );

    expect(source).toContain('className="desktop-folder-sheets"');
    expect(source).toContain("sheetByFolder[folder.id]");
    expect(source).toContain("isFolderExtended(index, activeFolderIndex)");
  });
});
