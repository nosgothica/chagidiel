# Chagidiel — The Black Madonna two-player beta

A two-player asynchronous/cooperative browser RPG beta based on the project design for KULT: Divinity Lost — The Black Madonna.

This package is a standalone repo-ready beta. It does **not** modify or deploy the existing Sangris repository automatically.

## Beta scope

The playable vertical slice covers Chapter I through the transition toward Chapter II:

1. passwordless email/SMS identity;
2. campaign creation and a one-use Seat B invite;
3. two independent protagonists;
4. KULT-styled dark UI and extracted campaign media;
5. opening Gold Plaque Story Lock;
6. independent Berlin Free Roam and private discoveries;
7. private-to-shared Case File disclosure;
8. forced Dodge-van ambush Story Lock;
9. Pogodin mansion / ritual Story Lock;
10. Chagidiel's Mark state and Chapter II beta boundary.

## Multiplayer behavior

- The Cloudflare Durable Object is authoritative for each campaign.
- Each verified user permanently owns Seat A or Seat B.
- WebSockets publish presence and state changes.
- Story Lock is a hard campaign state. Once active, the server rejects Free Roam until the scenario ends.
- Deliberate Story Locks have a readiness gate before activation. Forced Story Locks have an acknowledgment gate.
- Both protagonists privately submit their Story Lock action before a beat resolves.
- Private clues are filtered server-side; sharing a clue explicitly moves it into the shared Case File.
- Rolls for synchronized/shared actions are generated server-side.

## Rules used in this beta

The beta intentionally uses the currently available source set rather than inventing missing corebook material.

- Player Moves: **Player Moves 2.0 Alpha (Nov. 2024)**.
- General Harm/Wounds/Stability/Relations basis: the uploaded **KULT: Divinity Lost Quickstart Rules** where not superseded by Player Moves 2.0.
- Campaign content: **The Black Madonna**.
- Character creation is deliberately reduced and campaign-linked. Attributes are entered manually in this beta because the complete core rulebook will be added later.

The Player Moves 2.0 mapping implemented here is:

- Fortitude — Endure Injury
- Willpower — Keep It Together
- Reflexes — Act Under Pressure
- Reason — Investigate
- Intuition — Read a Person
- Perception — Observe a Situation
- Coolness — Employ Stealth
- Violence — Engage in Combat
- Charisma — Influence Other
- Soul — See Through the Illusion

The Improvised Move is also supported in authored Story Lock actions.

## UI / audio

The UI is predominantly black/charcoal with bone and muted crimson accents. Extracted KULT/Black Madonna media is framed contextually as story art, dossier material, maps, and occult presentation.

The action resolver uses a full-screen KULT-symbol tension overlay before returning results.

Read Aloud preserves the Sangris design direction:

- persistent local Off/On switch;
- mobile/iPhone audio priming from a user gesture;
- page settles before narration text is collected;
- controls and unchosen actions are excluded;
- long narration is chunked client-side;
- ElevenLabs audio is cached in R2 by voice/text/profile.

## Notifications

The first successful login automatically presents an in-app notification onboarding prompt. The OS permission request occurs only after the player taps **Enable notifications**, as browsers require a user gesture.

The beta currently has two notification paths:

1. **In-app/browser-local notification** while the PWA is still connected and receives a WebSocket presence/state event.
2. **Remote email or SMS fallback alerts** for Story Locks when Resend or Twilio is configured.

The service worker contains the receiving hook for Web Push, but this beta does **not** yet contain the VAPID payload-encryption/sending backend required for reliable remote browser push while the app is fully closed. `/api/config` and `/api/health` report this honestly as disabled. Add a Web Push provider or a standards-compliant VAPID sender in the next pass.

## Cloudflare resources

Required:

- Worker static assets binding: `ASSETS`
- Durable Object binding: `CAMPAIGNS` → `CampaignRoom`
- Durable Object binding: `AUTH` → `AuthRoom`
- R2 binding: `NARRATION_AUDIO`
- R2 bucket: `chagidiel-narration`
- secret: `AUTH_SECRET`

For narration:

- secret: `ELEVENLABS_API_KEY`

Optional email auth/alerts:

- `RESEND_API_KEY`
- `RESEND_FROM`

Optional SMS auth/alerts:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM`

For local development without a mail/SMS provider, set `DEV_OTP=true`. The development OTP is then returned only by the beta API response and displayed by the login UI.

## Setup

```sh
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Before production deployment, set `DEV_OTP=false` and add `AUTH_SECRET` as a Cloudflare secret rather than committing it.

Create the R2 bucket once if it does not exist:

```sh
npx wrangler r2 bucket create chagidiel-narration
```

Deploy:

```sh
npm run deploy
```

Then test:

```text
/api/health
```

The health response reports whether auth, ElevenLabs, R2, SMS, and email are configured.

## Recommended two-device beta test

Use two separate browser profiles/devices.

1. Sign in as Player A and Player B with different verified identities.
2. A creates a campaign and B claims the invite.
3. Create both characters.
4. Confirm the Gold Plaque gate cannot activate until both are ready.
5. Submit different Story Lock actions and verify neither player can choose for the other.
6. Complete Gold Plaque and confirm Free Roam opens.
7. Discover a clue privately; verify the other client cannot see it.
8. Share it to the Case File; verify it appears on both devices.
9. Confirm the ambush interrupts Free Roam and neither client can take a solo action until it ends.
10. Disconnect/reconnect one client and verify state recovery and presence.
11. Test Read Aloud on iPhone after a user gesture.
12. Complete the Pogodin ritual and verify Mark state is private to the marked seat.

## Known beta limits

- Full KULT corebook Archetypes/Advantages/Disadvantages are not yet implemented.
- Character attributes use a manual reduced setup screen pending the full corebook.
- Chapter II–VI are not authored into this beta.
- True closed-app remote Web Push is not yet implemented; email/SMS fallback works when provider credentials are configured.
- Durable Object multiplayer needs a real Cloudflare two-client integration test before this should be called production-ready.
