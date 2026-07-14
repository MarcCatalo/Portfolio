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

  it("keeps the updated framing copy centered around the editorial rules", () => {
    const source = readFileSync(
      new URL("./PortfolioFolderIndex.tsx", import.meta.url),
      "utf8",
    );
    const content = readFileSync(new URL("./content.ts", import.meta.url), "utf8");
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(content).toContain('role: "Mobile and Web Application Developer"');
    expect(content).toContain('label: "Projects handled"');
    expect(content).not.toContain(
      'label: "AHG Lab / Sandlot Technology Ventures Inc."',
    );
    expect(source).not.toContain("{profile.location} / 2026");
    expect(source).toContain(
      "Hover over a folder to open/ move across to switch",
    );
    expect(css).toMatch(/\.editorial-meta\s*{[^}]*font-size: 13px;/s);
    expect(css).toMatch(/\.hero-footnote span\s*{[^}]*font-size: 13px;/s);
    expect(css).toMatch(
      /\.hero-footnote\s*{[^}]*grid-template-columns: repeat\(2, minmax\(112px, 180px\)\);/s,
    );
    expect(css).toContain(
      "grid-template-columns: repeat(2, minmax(0, 1fr));",
    );
    expect(css).toMatch(/\.editorial-hint\s*{[^}]*left: 50%;/s);
  });
});
