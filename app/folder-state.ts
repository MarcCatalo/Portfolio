export type FolderTransition = {
  activeIndex: number;
  animateSheet: boolean;
};

export function getFolderTransition(
  previousIndex: number,
  nextIndex: number,
): FolderTransition {
  return {
    activeIndex: nextIndex,
    animateSheet: nextIndex > previousIndex,
  };
}

export function isFolderExtended(
  folderIndex: number,
  activeIndex: number,
): boolean {
  return activeIndex >= folderIndex;
}

export function getClosedFolderState(): FolderTransition {
  return {
    activeIndex: -1,
    animateSheet: false,
  };
}

export function shouldCloseFolderSystem(
  relatedTargetInSheet: boolean,
  relatedTargetInRail: boolean,
): boolean {
  return !relatedTargetInSheet && !relatedTargetInRail;
}
