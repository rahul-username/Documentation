# VOID — Private Spaceflight (Remotion teaser)

A 14-second, 1080p30 cinematic brand teaser built entirely in
[Remotion](https://www.remotion.dev/), demonstrating "high production"
techniques on top of a programmatic video pipeline.

## What it shows

| Technique | Where |
|---|---|
| Spring physics (no linear easing) | every entrance — title words, planet rise, stats, logo |
| Staggered reveals | `KineticTitle` words offset by frames; logo elements cascade |
| Parallax + depth | `Starfield` depth-sorted drift; lower horizon glow |
| Faux-3D (CSS, WebGL-free) | `Planet` — layered radial gradients, terminator, atmospheric bands |
| Animated telemetry counters | `StatReadout` (Apogee / Velocity) |
| Film grain + vignette | `Grain` (animated SVG turbulence) + tightening `Vignette` |
| Continuous camera push-in/drift | global transform in `VoidTeaser` |
| Light sweep + expanding tracking | `LogoLockup` wordmark reveal |

## Run

```bash
npm install
npm run studio    # interactive editor at localhost:3000
npm run render    # -> out/void-teaser.mp4
```

## Production upgrade path

- Swap `Planet.tsx` for `@remotion/three` (real 3D sphere, lighting, materials).
- Add an audio bed + whoosh/UI SFX via `<Audio>` (frame-perfect sync).
- For interactivity, render the same composition through Remotion's `<Player>`
  instead of `renderMedia`.
