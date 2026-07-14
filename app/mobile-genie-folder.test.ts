import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("mobile genie folders", () => {
  const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
  const source = readFileSync(
    new URL("./PortfolioFolderIndex.tsx", import.meta.url),
    "utf8",
  );

  it("keeps the folder rail fixed while the complete paper fans upward", () => {
    expect(css).toContain("--mobile-folder-seam-overlap: 2px;");
    expect(css).toContain("--mobile-genie-closed:");
    expect(css).toContain("--mobile-genie-open:");
    expect(css).toContain("clip-path: var(--mobile-genie-closed);");
    expect(css).toContain("clip-path: var(--mobile-genie-open);");
    expect(css).toContain("transform-origin: 50% 100%;");
    expect(css).toContain(".folder-slot-extended {\n    transform: none;");
  });

  it("warps the complete sheet through staged opening and closing contours", () => {
    expect(css).toContain("@keyframes mobile-genie-sheet-open");
    expect(css).toContain("@keyframes mobile-genie-sheet-close");
    expect(css).toContain("animation: mobile-genie-sheet-open");
    expect(css).toContain("animation: mobile-genie-sheet-close");
    expect(css).toContain("36% {");
    expect(css).toContain("82% {");
    expect(css).toContain("42% 38%,");
    expect(css).toContain("scaleX(0.18) scaleY(0.04)");
  });

  it("uses one responsive duration for the mobile paper and state lock", () => {
    expect(css).toContain("--motion-mobile-folder: 620ms;");
    expect(css).toContain(
      "--motion-mobile-ease: cubic-bezier(0.2, 0.72, 0.2, 1);",
    );
    expect(css).toContain(
      "animation: mobile-genie-sheet-open var(--motion-mobile-folder)",
    );
    expect(css).toContain(
      "animation: mobile-genie-sheet-close var(--motion-mobile-folder)",
    );
    expect(source).toMatch(
      /getFolderMotionDuration\(\s*usesMobileFolderLayout\(\),?\s*\)/,
    );
  });

  it("removes the folder seam and keeps indexes upright", () => {
    expect(css).toContain(
      "top: calc(\n      var(--mobile-tab-height) - var(--mobile-folder-seam-overlap)\n    );",
    );
    expect(css).toContain("writing-mode: horizontal-tb;");
  });

  it("places every paper directly above its source folder", () => {
    const mobileCss = css.slice(
      css.indexOf("@keyframes mobile-folder-stack-arrive"),
    );

    expect(mobileCss).toMatch(/\.folder-rail\s*{[^}]*z-index: auto;/s);
    expect(mobileCss).toMatch(/\.folder-slot-0\s*{[^}]*z-index: 10;/s);
    expect(mobileCss).toMatch(/\.folder-sheet-work\s*{[^}]*z-index: 20;/s);
    expect(mobileCss).toMatch(/\.folder-slot-1\s*{[^}]*z-index: 30;/s);
    expect(mobileCss).toMatch(
      /\.folder-sheet-projects\s*{[^}]*z-index: 40;/s,
    );
    expect(mobileCss).toMatch(/\.folder-slot-2\s*{[^}]*z-index: 50;/s);
    expect(mobileCss).toMatch(/\.folder-sheet-skills\s*{[^}]*z-index: 60;/s);
    expect(mobileCss).toMatch(/\.folder-slot-3\s*{[^}]*z-index: 70;/s);
    expect(mobileCss).toMatch(/\.folder-sheet-contact\s*{[^}]*z-index: 80;/s);
  });

  it("keeps the selected folder tab visible below its paper", () => {
    const mobileCss = css.slice(
      css.indexOf("@keyframes mobile-folder-stack-arrive"),
    );
    const sheetBlock = (folder: string) => {
      const matches = Array.from(
        mobileCss.matchAll(
          new RegExp(`\\.folder-sheet-${folder}\\s*\\{([^}]*)\\}`, "gs"),
        ),
      );

      return matches.at(-1)?.[1] ?? "";
    };

    expect(sheetBlock("work")).toContain(
      "var(--mobile-folder-bottom) + var(--mobile-stack-height)",
    );
    expect(sheetBlock("projects")).toContain(
      "var(--mobile-stack-height) -\n        var(--mobile-stack-step)",
    );
    expect(sheetBlock("skills")).toContain(
      "var(--mobile-stack-height) -\n        (var(--mobile-stack-step) * 2)",
    );
    expect(sheetBlock("contact")).toContain(
      "var(--mobile-stack-height) -\n        (var(--mobile-stack-step) * 3)",
    );

    for (const folder of ["work", "projects", "skills", "contact"]) {
      expect(sheetBlock(folder)).not.toContain("--mobile-tab-height");
    }
  });

  it("guards the close-before-switch sequence", () => {
    expect(source).toContain("mobileTransitionLockedRef");
    expect(source).toContain("aria-hidden={!activeFolder}");
  });
});
