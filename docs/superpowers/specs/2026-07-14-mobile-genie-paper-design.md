# Mobile Genie Paper Design

## Goal

Replace the mobile folder expansion with a stationary folder stack and a paper-like details surface that emerges upward from the selected folder. Preserve the current portfolio content and desktop interaction while improving the mobile composition, folder geometry, and perceived continuity.

## Scope

- Apply the revised interaction at viewport widths of `900px` and below.
- Keep the desktop cumulative hover interaction unchanged.
- Keep all existing Work, Projects, Skills, and Contact content unchanged.
- Preserve the existing monochrome folder order and the desktop `773ms` folder motion duration.
- Use a mobile-specific `620ms` duration for the Genie paper and synchronize the interaction lock timers to the same value.

## Mobile Folder Stack

- Keep all four folders fixed in their closed, layered positions near the bottom of the viewport.
- Center the stack horizontally and reduce its outer gutter, step spacing, and bottom offset slightly to reserve more vertical room for the hero and open paper.
- Keep the stack visible above the paper throughout opening, scrolling, switching, and closing.
- Preserve the wide upper-left tab and lower folder body as one continuous surface.
- Overlap the tab and body by a small amount and remove the body's top inset edge so no horizontal seam cuts across the folder extrusion.
- Display each two-digit folder index upright on the right side using normal horizontal text orientation.

## Genie Paper Motion

- Use one mobile details sheet positioned behind the stationary folder stack.
- Anchor the bottom edge of the sheet to the selected folder's opening while keeping a shared top boundary for the expanded state.
- Warp the complete sheet, including its text and controls, so the content visibly stretches and compresses with the paper.
- Replace the straight two-state transition with dedicated opening and closing keyframes inspired by the macOS Genie effect.
- Use matching multi-point `clip-path` polygons at each keyframe to create a narrow neck at the folder mouth and progressively curved side contours as the page rises.
- Coordinate each contour with vertical scale, horizontal compression, and upward translation so clipping and content deformation remain synchronized.
- In the closed state, narrow and compress the sheet at the selected folder mouth so it appears stored inside the folder.
- During the reveal, widen the top of the paper before the lower neck, then relax the remaining curve into a full-width rectangular details surface.
- Add a restrained settling frame near the end of the opening rather than a spring or bounce.
- Reverse the contour sequence when closing so the sheet is visibly drawn back into the same folder instead of fading or collapsing uniformly.
- Keep the sheet and its content in the same animated element so the folder details never appear before the paper reaches them.
- Use a mobile-specific `620ms` duration for both reveal and retraction.
- Rebalance the keyframes so the paper clears the folder earlier and spends less time in its final settling frames.
- Use a mobile easing curve with a continuous acceleration change and a shorter deceleration tail so the motion feels responsive without snapping.
- Avoid delayed child animations; typography and content move together with the paper surface.

## Interaction State

- Pressing a closed folder reveals its paper and updates `aria-expanded`.
- Pressing the active folder retracts the paper into the same folder.
- Pressing a different folder first retracts the current paper, then changes the selected content and reveals the next paper from the new folder.
- Keep folder buttons interactive while the sheet is open, but guard against repeated presses during the switching transition.
- Keep the open details area internally scrollable while the folder stack remains fixed and visible.

## Visual Layering

- On mobile, avoid treating the complete folder rail as one stacking context. Give each folder slot its own ascending layer and place the active paper immediately above its source folder.
- The Work paper appears above Work but below Projects, Skills, and Contact.
- The Projects paper appears above Work and Projects but below Skills and Contact.
- The Skills paper appears above Work, Projects, and Skills but below Contact.
- The Contact paper appears above the complete folder stack.
- Keep the paper connected to the selected folder mouth without a visible gap.
- Maintain enough internal bottom padding that content is never obscured by the visible stack.
- Keep straight, cohesive sheet edges; do not introduce rounded container corners where the paper meets the folders.

## Accessibility And Reduced Motion

- Retain semantic folder buttons, keyboard activation, visible focus, and `aria-expanded` state.
- Keep the mobile interaction press-based rather than hover-based.
- Under `prefers-reduced-motion`, replace the genie morph with the existing near-instant state change while preserving all content and controls.

## Verification

- Add focused regression coverage for a stationary mobile folder rail, synchronized `620ms` motion timing, and the interleaved sheet layer assigned to every folder.
- Preserve existing open, close, switch, desktop layering, and typography tests.
- Run the full Vitest suite, ESLint, and the production build.
- Visually verify the closed stack, each folder reveal, retraction, cross-folder switching, internal scrolling, seam removal, and upright numbering at representative mobile widths.
- Confirm the desktop layout and hover animation remain unchanged.
