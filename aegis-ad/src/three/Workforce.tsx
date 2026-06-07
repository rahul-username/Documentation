import { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TEAL } from "../components/Overlay";

// A stylized human figure built from primitives (head + capsule body).
// `activation` 0..1 drives glow + a small "power-on" rise.
const Person: React.FC<{ activation: number }> = ({ activation }) => {
  const lift = activation * 0.18;
  const intensity = 0.15 + activation * 2.6;
  const color = activation > 0.5 ? TEAL : "#1a2c4a";
  return (
    <group position={[0, lift, 0]}>
      {/* head */}
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={TEAL}
          emissiveIntensity={intensity}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      {/* body */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.17, 0.55, 8, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={TEAL}
          emissiveIntensity={intensity}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      {/* ground glow ring when active */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.28, 0.42, 28]} />
        <meshBasicMaterial color={TEAL} transparent opacity={activation * 0.7} />
      </mesh>
    </group>
  );
};

export const Workforce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cols = 9;
  const rows = 5;
  const spacing = 1.5;

  const grid = useMemo(() => {
    const arr: { x: number; z: number; col: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({
          x: (c - (cols - 1) / 2) * spacing,
          z: (r - (rows - 1) / 2) * spacing,
          col: c,
        });
      }
    }
    return arr;
  }, []);

  // Activation wave sweeps left -> right across the columns.
  const wave = interpolate(frame, [10, 80], [-2, cols + 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow orbit of the whole crowd.
  const rotY = interpolate(frame, [0, 150], [-0.5, -0.18]);

  return (
    <group rotation={[0, rotY, 0]} position={[0, -0.6, 0]}>
      {/* reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#05080f" metalness={0.8} roughness={0.35} />
      </mesh>
      {grid.map((p, i) => {
        const activation = interpolate(
          wave - p.col,
          [-0.6, 0.8],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <group key={i} position={[p.x, 0, p.z]}>
            <Person activation={activation} />
          </group>
        );
      })}
    </group>
  );
};
