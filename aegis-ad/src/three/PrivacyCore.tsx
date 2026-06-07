import { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TEAL } from "../components/Overlay";

// A contained data core: a glowing icosahedron inside a wireframe containment
// field, with data particles that orbit but never escape (the "zero leak" idea).
export const PrivacyCore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 90 },
  });
  const coreScale = interpolate(intro, [0, 1], [0.2, 1]);

  // Particles arranged on orbital shells inside the containment sphere.
  const positions = useMemo(() => {
    const n = 900;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const radius = 1.7 + Math.random() * 0.7; // all within containment (r≈2.6)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.cos(phi);
      arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  const rot = frame * 0.012;
  const pulse = 1 + Math.sin(frame * 0.12) * 0.03;

  return (
    <group scale={coreScale}>
      {/* solid data core */}
      <mesh rotation={[rot * 1.5, rot, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0a3d4a"
          emissive={TEAL}
          emissiveIntensity={1.4}
          metalness={0.6}
          roughness={0.25}
          flatShading
        />
      </mesh>
      {/* faceted wireframe shell */}
      <mesh rotation={[rot * 1.5, rot, 0]} scale={1.04}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={TEAL} wireframe transparent opacity={0.4} />
      </mesh>

      {/* orbiting data particles */}
      <points rotation={[0, rot * 2.2, rot]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#9af7e6"
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* containment field — the data never crosses this boundary */}
      <mesh scale={pulse}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color={TEAL}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh scale={pulse * 1.001}>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshBasicMaterial
          color="#1170ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};
