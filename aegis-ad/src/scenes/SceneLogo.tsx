import { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { LogoLockup } from "../components/LogoLockup";
import { TEAL } from "../components/Overlay";

// Drifting particle field backdrop for the lockup.
const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const positions = useMemo(() => {
    const n = 700;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, []);
  return (
    <points rotation={[0, frame * 0.004, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={TEAL}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
};

// Scene 4 — brand lockup + CTA.
export const SceneLogo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #07182a 0%, #04070f 60%, #02040a 100%)",
      }}
    >
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true }}
      >
        <fogExp2 attach="fog" args={[new THREE.Color("#04070f"), 0.06]} />
        <Backdrop />
      </ThreeCanvas>
      <LogoLockup />
    </AbsoluteFill>
  );
};
