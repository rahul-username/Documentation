# WORKER ZERO — 3D AI-employee ad (Remotion + Three.js)

A ~17s, 1080p30 brand ad for a **privacy-first, compliance-focused** platform
that sells autonomous AI agents as "AI employees." Built entirely in code with
**real 3D** (Three.js via `@remotion/three`) — no stock footage.

> Positioning: *Hire the workforce that never sleeps — or leaks.*

## Storyboard

| Scene | 3D content | Message |
|---|---|---|
| 1 · City | Procedural night skyline (lit-window facades, fog, flythrough) | "Every enterprise is hiring. Few can afford the risk." |
| 2 · Workforce | Crowd of 3D human figures powering on in a left→right wave | "The workforce that never sleeps — or leaks." |
| 3 · Privacy core | Data core inside a wireframe containment field; particles orbit but never escape + compliance badges | "Autonomous. Compliant. Private by design." |
| 4 · Lockup | Drifting particle field + WORKER ZERO wordmark | CTA: "Deploy your first AI employee · workerzero.ai" |

All scenes cross-dissolve (`@remotion/transitions`) under a global film-grain +
vignette + color grade.

## Render the MP4

```bash
npm install
npm run render        # -> out/worker-zero-ad.mp4
```

Three.js renders in headless Chromium via `Config.setChromiumOpenGlRenderer("angle")`
(see `remotion.config.ts`).

## Interactive version (scrub + play)

A Remotion `<Player>` mounted in a tiny Vite app — play/pause, scrub the
timeline, fullscreen, spacebar:

```bash
npm run player        # dev server at http://localhost:5173
npm run player:build  # static build -> player/dist
```

`npm run studio` also gives a full interactive editor.

## Notes / upgrade path

- **Real places/people:** figures and skyline are stylized procedural 3D
  (no real likenesses/landmarks — avoids licensing/likeness risk). To go
  photoreal, drop sourced city/office plates or stock people footage into the
  scenes as textures/`<Video>` layers, or composite AI-generated plates.
- Swap system fonts for a branded display face via `@remotion/google-fonts`.
- Add an audio bed + SFX with `<Audio>` for another big jump in perceived value.
