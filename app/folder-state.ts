export type FolderTransition = {
  activeIndex: number;
  animateSheet: boolean;
};

export const FOLDER_MOTION_MS = 773;
export const MOBILE_FOLDER_MOTION_MS = 440;

export function getFolderMotionDuration(isMobile: boolean): number {
  return isMobile ? MOBILE_FOLDER_MOTION_MS : FOLDER_MOTION_MS;
}

export function getFolderAfterPress<T extends string>(
  activeFolder: T | null,
  pressedFolder: T,
): T | null {
  return activeFolder === pressedFolder ? null : pressedFolder;
}

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
