import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  '"Helvetica Neue", "Arial Black", system-ui, -apple-system, sans-serif';

// One line of kinetic type. Springs in with a blur + upward settle, then
// drifts/fades out. Words inside stagger by a few frames each.
const Line: React.FC<{
  words: string[];
  start: number;
  exit: number;
  size: number;
  weight: number;
  letterSpacing: number;
  accent?: boolean;
}> = ({ words, start, exit, size, weight, letterSpacing, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const out = interpolate(frame, [exit, exit + 14], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outY = interpolate(frame, [exit, exit + 14], [0, -55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.28,
        opacity: out,
        transform: `translateY(${outY}px)`,
      }}
    >
      {words.map((w, i) => {
        const enter = spring({
          frame: frame - start - i * 5,
          fps,
          config: { damping: 14, mass: 0.7, stiffness: 110 },
        });
        const y = interpolate(enter, [0, 1], [60, 0]);
        const blur = interpolate(enter, [0, 1], [14, 0]);
        return (
          <span
            key={i}
            style={{
              fontFamily: FONT,
              fontSize: size,
              fontWeight: weight,
              letterSpacing,
              color: accent ? "#7fb0ff" : "#f4f8ff",
              textTransform: "uppercase",
              transform: `translateY(${y}px)`,
              opacity: enter,
              filter: `blur(${blur}px)`,
              textShadow: accent
                ? "0 0 40px rgba(90,150,255,0.6)"
                : "0 2px 30px rgba(0,0,0,0.6)",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const KineticTitle: React.FC = () => {
  return (
    <>
      <Line
        words={["Beyond"]}
        start={36}
        exit={70}
        size={160}
        weight={800}
        letterSpacing={6}
      />
      <Line
        words={["the", "edge"]}
        start={74}
        exit={108}
        size={150}
        weight={800}
        letterSpacing={4}
      />
      <Line
        words={["of", "everything"]}
        start={112}
        exit={158}
        size={120}
        weight={800}
        letterSpacing={2}
        accent
      />
    </>
  );
};
