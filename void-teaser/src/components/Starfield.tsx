import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { makeStars } from "../utils";

const STARS = makeStars(220, 12345);

// Parallax starfield: depth-sorted stars drift at different speeds and twinkle.
export const Starfield: React.FC<{ driftX?: number }> = ({ driftX = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const reveal = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: reveal }}>
      {STARS.map((s, i) => {
        // Near stars drift more — classic parallax.
        const parallax = (s.depth * 6 + 1) * driftX;
        const x = (s.x - (t * parallax) / 8) % 100;
        const wrappedX = x < 0 ? x + 100 : x;
        const twinkle =
          0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${wrappedX}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#dfeaff",
              opacity: s.baseOpacity * twinkle,
              boxShadow:
                s.size > 1.8
                  ? `0 0 ${s.size * 3}px rgba(180,210,255,0.9)`
                  : "none",
            }}
          />
        );
      })}
    </div>
  );
};
