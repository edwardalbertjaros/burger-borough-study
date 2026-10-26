# Burger Borough — source-only GitHub build

This flat repository contains both matched experimental game paths. Upload every file to the top level of one neutral GitHub repository and enable GitHub Pages.

## Files

- `index.html` — neutral landing page with no condition chooser.
- `game-1.html` — merge gameplay with Chef Bea, named customers, and the connected Burger Borough storyline.
- `game-2.html` — the same merge gameplay without characters, identities, dialogue, a competitor, or an overarching story.
- `game.css` — shared visual design for both paths.
- `game.js` — shared Pointer Events, mechanics, levels, scoring, energy, rewards, timing, and result payload for both paths.
- `qualtrics-listener.js` — code pasted into the Qualtrics game question's JavaScript editor.
- `QUALTRICS_SETUP.md` — deployment and Qualtrics instructions.
- `DATA_DICTIONARY.md` — recorded field definitions.
- `TESTING_CHECKLIST.md` — required prelaunch tests.

Participants see only **Burger Borough**. Neither game page displays Version A, Version B, narrative, nonnarrative, treatment, or control.

## Source-only guarantee

This build contains only HTML, CSS, JavaScript, and Markdown. It contains no executable files, installers, macros, compiled code, external libraries, downloaded fonts, or image assets. Food and character visuals use standard Unicode emoji rendered by the participant's device.

## Matched design

Both paths use the same shared `game.js` and `game.css`. They therefore have the same touch/mouse drag controls, tap fallback, six levels, 54 orders, order recipes, generators, merge rules, energy budgets, difficulty, scoring, fictional rewards, early-exit option, results, and Qualtrics fields. Only the story presentation changes.

Players can drag matching food pieces together, move a piece into an empty board space, or drag completed food directly to its matching order. Tapping two tiles and then an order remains available as an accessibility and device-compatibility fallback.

Build identifier: `2026.10.22-pointer-merge-v3`.
