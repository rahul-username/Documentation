import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

const FONT =
  '"Helvetica Neue", "Arial Black", system-ui, -apple-system, sans-serif';

// Final brand lockup: wordmark with a sweeping light, a hairline rule that
// draws open, tagline, and a CTA — all staggered.
export const LogoLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - 300;

  const wordmark = spring({
    frame: local,
    fps,
    config: { damping: 16, mass: 1, stiffness: 70 },
  });
  const wmY = interpolate(wordmark, [0, 1], [40, 0]);
  const wmBlur = interpolate(wordmark, [0, 1], [16, 0]);

  // Letter-spacing expands as it settles — a premium reveal trick.
  const tracking = interpolate(wordmark, [0, 1], [60, 26]);

  const ruleW = interpolate(local, [22, 55], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(local, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaOpacity = interpolate(local, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaPulse = 0.85 + 0.15 * Math.sin((frame / fps) * 3);

  // Light sweep across the wordmark.
  const sweep = interpolate(local, [10, 60], [-120, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          transform: `translateY(${wmY}px)`,
          opacity: wordmark,
          filter: `blur(${wmBlur}px)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: tracking,
            color: "#f6f9ff",
            textTransform: "uppercase",
            lineHeight: 1,
            textShadow: "0 0 60px rgba(90,150,255,0.35)",
          }}
        >
          VOID
        </div>
        {/* moving specular sweep */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sweep}%`,
            width: "18%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(6px)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div
        style={{
          height: 1,
          width: ruleW,
          background:
            "linear-gradient(90deg, rgba(127,176,255,0) 0%, rgba(127,176,255,0.9) 50%, rgba(127,176,255,0) 100%)",
          margin: "26px 0 22px",
        }}
      />

      <div
        style={{
          fontFamily: FONT,
          fontSize: 26,
          letterSpacing: 14,
          color: "rgba(200,218,255,0.85)",
          textTransform: "uppercase",
          opacity: tagOpacity,
        }}
      >
        Private Spaceflight
      </div>

      <div
        style={{
          marginTop: 54,
          fontFamily: FONT,
          fontSize: 22,
          letterSpacing: 4,
          color: "#0a1024",
          background: "#7fb0ff",
          padding: "16px 38px",
          borderRadius: 4,
          textTransform: "uppercase",
          fontWeight: 700,
          opacity: ctaOpacity,
          boxShadow: `0 0 ${30 * ctaPulse}px rgba(127,176,255,${0.6 * ctaPulse})`,
        }}
      >
        Reserve Your Seat · 2027
      </div>
    </div>
  );
};
