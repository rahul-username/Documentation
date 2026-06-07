import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { TEAL } from "./Overlay";

const FONT =
  '"Helvetica Neue", "Arial Black", system-ui, -apple-system, sans-serif';

// Final brand lockup for WORKER ZERO.
export const LogoLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wm = spring({
    frame,
    fps,
    config: { damping: 16, mass: 1, stiffness: 70 },
  });
  const wmY = interpolate(wm, [0, 1], [44, 0]);
  const wmBlur = interpolate(wm, [0, 1], [16, 0]);
  const tracking = interpolate(wm, [0, 1], [40, 12]);

  const ruleW = interpolate(frame, [22, 55], [0, 640], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tag = interpolate(frame, [38, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cta = interpolate(frame, [66, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaPulse = 0.85 + 0.15 * Math.sin((frame / fps) * 3);
  const sweep = interpolate(frame, [8, 60], [-120, 220], {
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
          opacity: wm,
          filter: `blur(${wmBlur}px)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 150,
            fontWeight: 900,
            letterSpacing: tracking,
            textTransform: "uppercase",
            lineHeight: 1,
            color: "#f4f9ff",
            textShadow: "0 0 50px rgba(45,226,199,0.25)",
          }}
        >
          WORKER<span style={{ color: TEAL, textShadow: `0 0 50px ${TEAL}` }}> ZERO</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sweep}%`,
            width: "16%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
            filter: "blur(6px)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div
        style={{
          height: 1,
          width: ruleW,
          background: `linear-gradient(90deg, rgba(45,226,199,0) 0%, ${TEAL} 50%, rgba(45,226,199,0) 100%)`,
          margin: "30px 0 24px",
        }}
      />

      <div
        style={{
          fontFamily: FONT,
          fontSize: 30,
          letterSpacing: 6,
          color: "rgba(206,226,255,0.9)",
          opacity: tag,
          fontWeight: 500,
        }}
      >
        Hire the workforce that never sleeps — or leaks.
      </div>

      <div
        style={{
          marginTop: 52,
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: cta,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            letterSpacing: 3,
            color: "#04110f",
            background: TEAL,
            padding: "16px 36px",
            borderRadius: 6,
            textTransform: "uppercase",
            fontWeight: 800,
            boxShadow: `0 0 ${34 * ctaPulse}px rgba(45,226,199,${0.6 * ctaPulse})`,
          }}
        >
          Deploy your first AI employee
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            letterSpacing: 4,
            color: TEAL,
            fontWeight: 600,
          }}
        >
          workerzero.ai
        </div>
      </div>
    </div>
  );
};
