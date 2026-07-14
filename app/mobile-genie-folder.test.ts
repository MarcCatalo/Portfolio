import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("mobile rising folder sheets", () => {
  const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
  const source = readFileSync(
    new URL("./PortfolioFolderIndex.tsx", import.meta.url),
    "utf8",
  );

  it("keeps the folder rail fixed while the paper rises upward", () => {
    expect(css).toContain("--mobile-folder-seam-overlap: 2px;");
    expect(css).toContain("transform: translate3d(0, 28px, 0);");
    expect(css).toContain("will-change: opacity, transform;");
    expect(css).toContain(".folder-slot-extended {\n    transform: none;");
  });

  it("uses a simple rise instead of the genie distortion", () => {
    expect(css).toContain("@keyframes mobile-sheet-rise-open");
    expect(css).toContain("@keyframes mobile-sheet-rise-close");
    expect(css).toContain("animation: mobile-sheet-rise-open");
    expect(css).toContain("animation: mobile-sheet-rise-close");
    expect(css).not.toContain("animation: mobile-genie-sheet-open");
    expect(css).not.toContain("animation: mobile-genie-sheet-close");
  });

  it("uses one responsive duration for the mobile paper and state lock", () => {
    expect(css).toContain("--motion-mobile-folder: 440ms;");
    expect(css).toContain(
      "--motion-mobile-ease: cubic-bezier(0.22, 1, 0.36, 1);",
    );
    expect(css).toContain(
      "animation: mobile-sheet-rise-open var(--motion-mobile-folder)",
    );
    expect(css).toContain(
      "animation: mobile-sheet-rise-close var(--motion-mobile-folder)",
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
