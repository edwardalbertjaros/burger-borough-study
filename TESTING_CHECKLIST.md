# Testing checklist

## Condition matching

- [ ] Both paths use the same board, food chains, orders, energy, scoring, rewards, colors, and layout.
- [ ] Neither path displays Version A, Version B, narrative, nonnarrative, treatment, or control.
- [ ] `game-1` contains characters and connected story scenes.
- [ ] `game-2` contains no character names, faces, dialogue, Chef Bea, or Pizza Pleasure Palace.
- [ ] Story content never changes an order, score, energy budget, reward, or difficulty.

## Gameplay

- [ ] Dragging works with a mouse and a touchscreen.
- [ ] Dragging matching tiles together creates the same merge as tapping them.
- [ ] Dragging a tile into an empty space moves it without changing score or energy.
- [ ] Dragging a completed food to a matching order serves it.
- [ ] Invalid drop targets reject the piece without changing the board.
- [ ] Tap-to-select remains functional as a fallback.
- [ ] Matching tier-one tiles merge into tier two.
- [ ] Matching tier-two tiles merge into tier three.
- [ ] Tier-three tiles do not merge further.
- [ ] Correct foods serve matching orders.
- [ ] Incorrect foods do not serve orders.
- [ ] Restart resets the current board and level score.
- [ ] Energy budgets are sufficient when generators are used correctly.
- [ ] Levels require exactly 4, 6, 8, 10, 12, and 14 orders.
- [ ] Foods unlock cumulatively through pizza.
- [ ] Fictional reward tiers unlock after Levels 3, 4, and 5.
- [ ] The voluntary-exit control works from every major screen.

## Qualtrics

- [ ] The repository and iframe labels are neutral.
- [ ] Every game field in `DATA_DICTIONARY.md` exists in Survey Flow with the required `__js_` prefix.
- [ ] The allowed origin matches GitHub Pages exactly.
- [ ] Progress messages save without advancing the survey.
- [ ] Completion messages save and advance the survey.
- [ ] Both conditions export the same fields.
- [ ] Qualtrics' built-in `ResponseId` is present without being placed in the GitHub Pages URL.
- [ ] Drag attempts, merges, moves, serves, and failed drops transfer correctly.
- [ ] Full completion, restart, and voluntary exit have been tested in a published survey.
