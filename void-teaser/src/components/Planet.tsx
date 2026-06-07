import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

// A faux-3D planet built entirely from layered radial gradients:
//  - a sphere body with a hard terminator (day/night line)
//  - a drifting "surface" band for rotation
//  - an atmospheric rim-light glow
// (In production you'd swap this for @remotion/three; CSS keeps the render
//  WebGL-free and deterministic.)
export const Planet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Rises into frame on a spring, then holds.
  const rise = spring({
    frame: frame - 150,
    fps,
    config: { damping: 18, mass: 1.2, stiffness: 80 },
  });
  const y = interpolate(rise, [0, 1], [height * 0.55, height * 0.18]);
  const scale = interpolate(rise, [0, 1], [0.6, 1]);

  const surfaceShift = (frame / fps) * 4; // slow rotation

  const size = 760;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        transform: `translate(-50%, ${y}px) scale(${scale})`,
        width: size,
        height: size,
      }}
    >
      {/* Atmospheric outer glow */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(90,150,255,0.45) 0%, rgba(70,120,255,0.18) 40%, rgba(0,0,0,0) 68%)",
          filter: "blur(20px)",
        }}
      />
      {/* Sphere body + terminator */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 32% 28%, #7fb4ff 0%, #2f5fd0 20%, #16306f 40%, #0a1838 58%, #04060d 76%)",
          boxShadow:
            "inset -70px -55px 150px rgba(0,0,0,0.92), inset 25px 20px 60px rgba(120,170,255,0.25), 0 0 90px rgba(60,120,255,0.35)",
          overflow: "hidden",
        }}
      >
        {/* Drifting atmospheric bands (rotation illusion) — soft and gaseous */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `repeating-linear-gradient(8deg, rgba(150,190,255,0.05) 0px, rgba(150,190,255,0.05) 26px, rgba(10,30,80,0.07) 26px, rgba(10,30,80,0.07) 72px)`,
            backgroundPositionX: `${surfaceShift * 10}px`,
            mixBlendMode: "screen",
            opacity: 0.5,
            filter: "blur(3px)",
          }}
        />
        {/* Specular highlight */}
        <div
          style={{
            position: "absolute",
            left: "24%",
            top: "20%",
            width: "30%",
            height: "26%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(220,235,255,0.55) 0%, rgba(220,235,255,0) 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>
    </div>
  );
};
