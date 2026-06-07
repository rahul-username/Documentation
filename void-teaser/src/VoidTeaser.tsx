import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Starfield } from "./components/Starfield";
import { Planet } from "./components/Planet";
import { KineticTitle } from "./components/KineticTitle";
import { StatReadout } from "./components/StatReadout";
import { LogoLockup } from "./components/LogoLockup";
import { Grain, Vignette } from "./components/Grain";

export const VoidTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Global "camera": a slow continuous push-in + drift so nothing is ever
  // perfectly static. This is the single biggest cinematic tell.
  const camScale = interpolate(frame, [0, durationInFrames], [1.0, 1.08]);
  const camX = interpolate(frame, [0, durationInFrames], [0, -18]);

  // Open from black, settle to black at the very end.
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0.82],
    { extrapolateLeft: "clamp" }
  );

  // Vignette tightens through the film.
  const vig = interpolate(frame, [0, durationInFrames], [0.7, 1.0]);

  return (
    <AbsoluteFill style={{ background: "#03050b" }}>
      <AbsoluteFill
        style={{
          opacity: fadeIn * fadeOut,
          transform: `scale(${camScale}) translateX(${camX}px)`,
        }}
      >
        {/* Deep-space gradient base */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, #0a1c44 0%, #060b1c 45%, #03050b 80%)",
          }}
        />

        <Starfield />
        <Planet />

        {/* Lower horizon glow that breathes */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 50% 118%, rgba(90,150,255,0.35) 0%, rgba(0,0,0,0) 55%)",
          }}
        />

        {/* Components self-gate on absolute frame timing (no Sequence offset,
            which would reset useCurrentFrame and break their cues). */}
        <KineticTitle />
        <StatReadout />
        <LogoLockup />

        <Vignette strength={vig} />
        <Grain opacity={0.05} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
