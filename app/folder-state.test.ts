import { describe, expect, it } from "vitest";

import {
  getClosedFolderState,
  getFolderAfterPress,
  getFolderTransition,
  isFolderExtended,
  shouldCloseFolderSystem,
} from "./folder-state";

describe("getFolderAfterPress", () => {
  it("opens a folder when the stack is closed", () => {
    expect(getFolderAfterPress(null, "work")).toBe("work");
  });

  it("closes the active folder when it is pressed again", () => {
    expect(getFolderAfterPress("projects", "projects")).toBeNull();
  });

  it("switches directly to a different folder", () => {
    expect(getFolderAfterPress("work", "skills")).toBe("skills");
  });
});

describe("getFolderTransition", () => {
  it("animates when opening deeper into the folder stack", () => {
    expect(getFolderTransition(0, 2)).toEqual({
      activeIndex: 2,
      animateSheet: true,
    });
  });

  it("shows an already-open sheet immediately when moving backward", () => {
    expect(getFolderTransition(2, 0)).toEqual({
      activeIndex: 0,
      animateSheet: false,
    });
  });

  it("does not restart the sheet animation for the current folder", () => {
    expect(getFolderTransition(1, 1)).toEqual({
      activeIndex: 1,
      animateSheet: false,
    });
  });
});

describe("isFolderExtended", () => {
  it("keeps every folder through the active index extended", () => {
    expect([0, 1, 2, 3].map((index) => isFolderExtended(index, 2))).toEqual([
      true,
      true,
      true,
      false,
    ]);
  });
});

describe("getClosedFolderState", () => {
  it("retracts immediately without restarting the sheet animation", () => {
    expect(getClosedFolderState()).toEqual({
      activeIndex: -1,
      animateSheet: false,
    });
  });
});

describe("shouldCloseFolderSystem", () => {
  it("keeps the folder open while moving between the rail and sheet", () => {
    expect(shouldCloseFolderSystem(true, false)).toBe(false);
    expect(shouldCloseFolderSystem(false, true)).toBe(false);
  });

  it("closes immediately when the pointer leaves both regions", () => {
    expect(shouldCloseFolderSystem(false, false)).toBe(true);
  });
});
