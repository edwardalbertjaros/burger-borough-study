# Gameplay data dictionary

The listener sends each game field without a prefix. In Qualtrics' New Survey Taking Experience, declare it in Survey Flow with `__js_` before the name, so `bb_total_score` is stored as `__js_bb_total_score`.

| Field | Meaning |
|---|---|
| `bb_condition` | Internal neutral path: `game-1` or `game-2` |
| `bb_game_version` | Exact deployed build identifier |
| `ResponseId` | Qualtrics' built-in response identifier; it is not passed through GitHub Pages |
| `bb_completed_level` | Highest completed level |
| `bb_current_level` | Level active when play ended |
| `bb_total_score` | Sum of completed-level scores |
| `bb_reward_tier` | `none`, `fries`, `burger-fries`, or `combo` |
| `bb_reward_choice` | Redeem in person, save, decline, or none |
| `bb_ended_early` | Whether the participant voluntarily stopped |
| `bb_exit_reason` | Completion or voluntary-exit level |
| `bb_total_seconds` | Total elapsed browser-session time |
| `bb_active_seconds` | Time spent on active merge boards |
| `bb_level_times` | Comma-separated active seconds for Levels 1–6 |
| `bb_level_scores` | Comma-separated scores for Levels 1–6 |
| `bb_level_merges` | Comma-separated merge counts for Levels 1–6 |
| `bb_level_energy_used` | Comma-separated generator energy used by level |
| `bb_restarts` | Comma-separated restart counts by level |
| `bb_generator_taps` | Total successful generator taps |
| `bb_merges` | Total successful merges |
| `bb_orders_served` | Total orders completed |
| `bb_invalid_moves` | Unmatched selections or incorrect serve attempts |
| `bb_drag_attempts` | Drag gestures that crossed the movement threshold |
| `bb_drag_merges` | Successful merges completed by dragging |
| `bb_drag_moves` | Successful moves into empty board spaces |
| `bb_drag_serves` | Orders served by dragging food to an order card |
| `bb_failed_drops` | Drag gestures released on incompatible or invalid targets |

The two conditions export the same fields in the same formats.
