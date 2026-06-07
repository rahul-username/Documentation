import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  '"Helvetica Neue", "Arial Black", system-ui, -apple-system, sans-serif';

export const TEAL = "#2de2c7";
export const BLUE = "#3b82f6";

// A kinetic line that springs in (blur + rise) and optionally drifts out.
export const KineticLine: React.FC<{
  children: React.ReactNode;
  start: number;
  exit?: number;
  size?: number;
  weight?: number;
  tracking?: number;
  color?: string;
  top?: string;
  glow?: boolean;
}> = ({
  children,
  start,
  exit,
  size = 64,
  weight = 800,
  tracking = 0,
  color = "#f3f8ff",
  top = "50%",
  glow = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 16, mass: 0.8, stiffness: 110 },
  });
  const y = interpolate(enter, [0, 1], [42, 0]);
  const blur = interpolate(enter, [0, 1], [12, 0]);
  const out = exit
    ? interpolate(frame, [exit, exit + 16], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const outY = exit
    ? interpolate(frame, [exit, exit + 16], [0, -36], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        textAlign: "center",
        transform: `translateY(${y + outY}px)`,
        opacity: enter * out,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: size,
          fontWeight: weight,
          letterSpacing: tracking,
          color,
          textTransform: "uppercase",
          filter: `blur(${blur}px)`,
          textShadow: glow
            ? `0 0 40px ${color}aa, 0 0 8px ${color}66`
            : "0 2px 30px rgba(0,0,0,0.7)",
        }}
      >
        {children}
      </span>
    </div>
  );
};

// Compliance badge pill that pops in on a spring.
export const Badge: React.FC<{ label: string; start: number; index: number }> =
  ({ label, start, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const enter = spring({
      frame: frame - start - index * 6,
      fps,
      config: { damping: 12, mass: 0.6, stiffness: 130 },
    });
    const s = interpolate(enter, [0, 1], [0.6, 1]);
    return (
      <div
        style={{
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
          color: TEAL,
          textTransform: "uppercase",
          padding: "12px 26px",
          border: `1px solid ${TEAL}88`,
          borderRadius: 999,
          background: "rgba(20,40,45,0.45)",
          boxShadow: `0 0 26px rgba(45,226,199,0.25)`,
          backdropFilter: "blur(4px)",
          transform: `scale(${s})`,
          opacity: enter,
        }}
      >
        {label}
      </div>
    );
  };
