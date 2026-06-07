import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { City } from "../three/City";
import { KineticLine, TEAL } from "../components/Overlay";

// Scene 1 — establish the enterprise world: a 3D city flythrough.
export const SceneCity: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#03050b" }}>
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 17, 40], fov: 46 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#04070f"]} />
        <fogExp2 attach="fog" args={[new THREE.Color("#0a1a33"), 0.013]} />
        <hemisphereLight args={["#274a7a", "#020308", 0.5]} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[10, 20, 10]} intensity={0.5} color="#aee9ff" />
        <pointLight position={[0, 10, 8]} intensity={60} color={TEAL} distance={50} />
        <City />
      </ThreeCanvas>

      <KineticLine start={14} exit={96} size={66} tracking={2} top="40%">
        Every enterprise is hiring.
      </KineticLine>
      <KineticLine
        start={48}
        exit={96}
        size={40}
        weight={500}
        tracking={6}
        color={TEAL}
        top="52%"
        glow
      >
        Few can afford the risk.
      </KineticLine>

      {/* top + bottom cinematic letterbox */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90, background: "#000" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "#000" }} />
    </AbsoluteFill>
  );
};
