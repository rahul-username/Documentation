import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT_MONO = '"SF Mono", "Roboto Mono", ui-monospace, monospace';

const Stat: React.FC<{
  label: string;
  to: number;
  suffix: string;
  decimals: number;
  start: number;
  side: "left" | "right";
}> = ({ label, to, suffix, decimals, start, side }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 90 },
  });
  // Counter ramps up then holds.
  const value = interpolate(frame, [start, start + 70], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(enter, [0, 1], [side === "left" ? -50 : 50, 0]);

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${x}px)`,
        textAlign: side,
        fontFamily: FONT_MONO,
      }}
    >
      <div
        style={{
          fontSize: 18,
          letterSpacing: 6,
          color: "rgba(150,180,230,0.7)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: "#eaf2ff",
          textShadow: "0 0 30px rgba(90,150,255,0.4)",
        }}
      >
        {value.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span style={{ fontSize: 28, color: "#7fb0ff", marginLeft: 6 }}>
          {suffix}
        </span>
      </div>
    </div>
  );
};

// Two flanking telemetry readouts that animate up as the planet settles.
export const StatReadout: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [288, 310], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 140,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: "0 160px",
        opacity: out,
      }}
    >
      <Stat
        label="Apogee"
        to={417.2}
        suffix="km"
        decimals={1}
        start={205}
        side="left"
      />
      <Stat
        label="Velocity"
        to={27500}
        suffix="km/h"
        decimals={0}
        start={225}
        side="right"
      />
    </div>
  );
};
