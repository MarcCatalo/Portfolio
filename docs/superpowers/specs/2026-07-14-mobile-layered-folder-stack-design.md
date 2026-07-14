# Mobile Layered Folder Stack Design

## Goal

Refine the portfolio's folder interaction without changing its content or desktop composition. Desktop folders should open another 20% more slowly, while mobile should present the same cumulative folder metaphor as desktop in a bottom-anchored vertical stack.

## Motion

- Increase the shared folder transition from `644ms` to `773ms`.
- Use the same `773ms` duration for the primary mobile folder rise and retraction.
- Keep the existing easing curve so the slower motion remains responsive at the beginning and settles softly.
- Respect `prefers-reduced-motion` by reducing transitions to the existing near-instant duration.

## Mobile Closed State

- Apply the mobile layout at viewport widths of `900px` and below.
- Center the folder stack horizontally near the bottom of the viewport.
- Render four full-width overlapping folder layers in this order: Work, Projects, Skills, Contact.
- Each folder exposes a wide upper-left tab containing its title and a right-aligned two-digit index on the folder body.
- Preserve the existing monochrome progression from white through gray to black.
- All folders are initially closed, and the hero remains visible above the stack.

## Mobile Open State

- Pressing a folder pulls the folder surface upward from bottom to top.
- Folders before the active folder remain visibly extended behind it, matching the cumulative desktop behavior.
- The active folder's tab, body, and details form one connected surface with no gap or rounded inner seam.
- Folders after the active folder remain layered below as the unopened stack.
- The details area uses the remaining vertical space and scrolls internally while the exposed folder tabs stay fixed.
- Pressing the active folder again retracts it from top to bottom and returns the stack to its closed state.
- Pressing another folder retracts the current surface before the new folder rises. Content changes only when the new folder begins opening, preventing stale or delayed sheet motion.

## Desktop Behavior

- Keep the existing hover-driven horizontal cumulative folder interaction.
- Change only the folder transition duration to `773ms`.
- Do not alter desktop sizes, positions, content sheets, or hover boundaries.

## Interaction And Accessibility

- Keep each folder as a semantic button with `aria-expanded` reflecting its active state.
- Preserve keyboard focus behavior on desktop.
- Mobile interaction remains press-based; hover must not open folders on touch layouts.
- Keep the Resume and LinkedIn interactions unchanged.

## Verification

- Update the folder motion regression test to require `773ms`.
- Preserve state tests for opening, closing, and switching folders.
- Add or update structural tests for the cumulative mobile stack where practical.
- Run the full Vitest suite, ESLint, and the production build.
- Visually verify closed, active, closing, and switched states at representative mobile and desktop viewports.
