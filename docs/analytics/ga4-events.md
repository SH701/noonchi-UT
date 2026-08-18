# GA4 Event Taxonomy (Frontend)

GA4 is bootstrapped in `src/app/layout.tsx` via `NEXT_PUBLIC_GA_ID` and the
global `gtag()` (typed in `src/types/declarations.d.ts`). Events are emitted with
direct `gtag("event", ...)` calls at the point of the user action.

This file maps the frontend event names to the weekly-report KPIs and lists the
params each event carries. **No PII** (email / name / phone / raw conversation or
voice text) is ever sent as an event param.

## Core value events

| Weekly-report KPI         | GA4 event (FE)          | Where it fires                                                                                 | Params                                                                 |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `roleplay_start_*`        | `roleplay_start`        | `features/roleplay/.../roleplay/RoleplaySection.tsx` (after `createRoleplay` succeeds)         | `entry_point`, `scenario_id`, `category`, `topic_name`, `topic_id`     |
| `roleplay_complete_*`     | `roleplay_complete`     | `features/roleplay/components/RoleplayChat.tsx` (`handleEnd`)                                  | `conversation_id`, `scenario_id`, `duration_sec`, `topic`, `situation` |
| `report_view_*`           | `feedback_view`         | `features/result/components/ResultRoleplay.tsx` (on `feedback` load)                           | `report_id`, `conversation_id`, `source`                               |
| `onboarding_start_users`  | `onboarding_start`      | `features/onboard/components/Onboarding.tsx` (on mount)                                        | —                                                                      |
| `onboarding_complete`     | `onboarding_complete`   | `features/onboard/components/Onboarding.tsx` (last slide)                                      | —                                                                      |
| `signup_complete_users`   | `sign_up`               | email: `features/auth/.../signup/SignupDetail.tsx`; OAuth native: `providers/AuthProvider.tsx` | `method` (`email` / `google` / `apple`)                                |
| `report_score_improved_*` | `report_score_improved` | `features/result/components/ResultRoleplay.tsx`                                                | `metric`, `prev_score`, `new_score`, `delta`, `report_id`              |

### Naming note

The measurement spec names these `report_view` and `signup_complete`. The FE keeps
the pre-existing GA4 event names `feedback_view` and `sign_up` (the latter is a GA4
**recommended** event) to avoid breaking existing config. Map the names in the
weekly report per the table above. `duration_sec` for `roleplay_complete` is derived
from `conversation.createdAt` → end click.

## Backend-dependent (wired on FE, inert until backend provides data)

Two events are fully plumbed on the frontend but stay silent until the backend adds
the required fields. No FE change is needed once these land.

1. **`report_score_improved`** — needs the user's previous scores for the same
   scenario on the feedback payload. Add to `ConversationFeedback`
   (`src/types/conversations/conversations.type.ts`):
   - `prevPolitenessScore?: number`
   - `prevNaturalnessScore?: number`
   - `prevPronunciationScore?: number`
     The FE already compares prev vs new per metric and emits the event for any
     improvement.

2. **`sign_up` vs `login` for OAuth** — needs an `isNewUser` flag so a brand-new
   OAuth account counts as `sign_up` instead of `login`. Add `isNewUser?: boolean`
   to the session (typed in `src/types/next-auth.d.ts`).
   - Native OAuth (`providers/AuthProvider.tsx`) already reads
     `session.isNewUser` and emits `sign_up` when true.
   - Web OAuth (`features/auth/.../login/LoginContent.tsx`) redirects away before
     the session exists, so it always emits `login`. A post-redirect session read
     is required to split new-vs-returning for web OAuth (follow-up).

Backend fields are referenced in code with `TODO(backend __ASK_JINSUNG__)` markers.

## Environment

`NEXT_PUBLIC_GA_ID` — GA4 Measurement ID (`G-XXXXXXXXXX`). See `.env.example`.
Real values are injected locally / in the deploy env, never committed.
