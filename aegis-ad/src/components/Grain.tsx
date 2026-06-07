import { useCurrentFrame } from "remotion";

// Animated film grain via SVG turbulence (re-seeded per frame so it moves).
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 50;
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={2}
          seed={seed}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({
  strength = 0.9,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 36%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

// Subtle scanline / hologram tint for the privacy-tech aesthetic.
export const ColorGrade: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      mixBlendMode: "soft-light",
      background:
        "linear-gradient(180deg, rgba(40,90,200,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 65%, rgba(0,200,180,0.18) 100%)",
    }}
  />
);
