# GitHub Pages and Qualtrics setup

## 0. Confirm Qualtrics permissions and layout

Before building the survey flow, confirm that the game question offers both the HTML source editor and **Question behavior → JavaScript**. Your institution's Qualtrics administrator must allow custom HTML and JavaScript. Use the **New Survey Taking Experience** for the setup below.

## 1. Upload the source files to GitHub

Create a neutral repository and upload every file in this folder to the repository's top level. Do not rename `game-1.html`, `game-2.html`, `game.css`, or `game.js`.

In the repository, open **Settings → Pages**, select deployment from the `main` branch and `/ (root)`, and save. After GitHub publishes the site, confirm these direct paths open:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/game-1.html
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/game-2.html
```

Do not send participants to the repository root. The root page intentionally provides no condition chooser.

## 2. Create Qualtrics Embedded Data fields

These instructions target Qualtrics' **New Survey Taking Experience**, the default for newly created surveys. At the beginning of Survey Flow, add one Embedded Data element containing these blank fields. The `__js_` prefix is required in Survey Flow; it is intentionally omitted when `qualtrics-listener.js` calls `setJSEmbeddedData`.

```text
__js_bb_condition
__js_bb_game_version
__js_bb_completed_level
__js_bb_current_level
__js_bb_total_score
__js_bb_reward_tier
__js_bb_reward_choice
__js_bb_ended_early
__js_bb_exit_reason
__js_bb_total_seconds
__js_bb_active_seconds
__js_bb_level_times
__js_bb_level_scores
__js_bb_level_merges
__js_bb_level_energy_used
__js_bb_restarts
__js_bb_generator_taps
__js_bb_merges
__js_bb_orders_served
__js_bb_invalid_moves
__js_bb_drag_attempts
__js_bb_drag_merges
__js_bb_drag_moves
__js_bb_drag_serves
__js_bb_failed_drops
```

Qualtrics automatically includes its own `ResponseId` in the response export. Do not put a ResponseID in the GitHub Pages URL; the game does not need it, and keeping it inside Qualtrics avoids exposing a unique study identifier to the web host.

If your existing survey uses a legacy layout, either switch it to the New Survey Taking Experience before following these instructions or revise both the field names and listener for the legacy API. Do not mix legacy unprefixed fields with this new-experience listener.

## 3. Randomize the assigned path

Create two branches inside a Survey Flow Randomizer and evenly present one branch:

- Branch 1 sets `game_file` to `game-1.html`.
- Branch 2 sets `game_file` to `game-2.html`.

Never display `game_file` to participants.

## 4. Embed Burger Borough

Add a Descriptive Text question and use its HTML editor to insert:

```html
<iframe
  id="burgerBoroughGame"
  title="Burger Borough restaurant game"
  src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/${e://Field/game_file}"
  style="width:100%;height:780px;border:0;border-radius:16px"
  allow="fullscreen">
</iframe>
```

If your Qualtrics account does not pipe `game_file` into question HTML, put a separate game question inside each randomized branch and use the corresponding fixed URL.

## 5. Add the result listener

Open the game question's JavaScript editor and paste the entire contents of `qualtrics-listener.js`. Replace:

```javascript
var ALLOWED_GAME_ORIGIN = "https://YOUR-USERNAME.github.io";
```

with your exact GitHub Pages origin. Do not include the repository path or a trailing slash.

The listener records progress after each completed level. It verifies both the GitHub Pages origin and the exact game iframe, acknowledges receipt, and advances the survey only after the participant completes or voluntarily exits the game and selects **Send Results and Continue to Survey**.

## 6. Test the published survey

Use a published anonymous Qualtrics link rather than relying only on Preview mode. Complete these tests before recruitment:

1. Finish all six levels through each path.
2. Exit early through each path.
3. Restart a level.
4. Select each reward-response option.
5. Export the response data and confirm every `__js_bb_` field is populated appropriately and that Qualtrics' built-in `ResponseId` is present.

Do not begin recruitment until both paths generate complete Qualtrics rows.
