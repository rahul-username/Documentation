import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { Workforce } from "../three/Workforce";
import { KineticLine, TEAL } from "../components/Overlay";

// Scene 2 — the workforce powers on in a wave: ordinary headcount becomes
// an autonomous AI workforce.
export const SceneWorkforce: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#03060d" }}>
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 3.4, 9.5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#03060d"]} />
        <fogExp2 attach="fog" args={[new THREE.Color("#061427"), 0.05]} />
        <hemisphereLight args={["#22456f", "#020308", 0.5]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 6, 6]} intensity={50} color="#bfe9ff" distance={40} />
        <pointLight position={[-6, 3, 2]} intensity={30} color={TEAL} distance={30} />
        <Workforce />
      </ThreeCanvas>

      <KineticLine start={18} exit={150} size={62} tracking={1} top="16%">
        The workforce that never sleeps.
      </KineticLine>
      <KineticLine
        start={72}
        exit={150}
        size={48}
        weight={800}
        tracking={2}
        color={TEAL}
        top="78%"
        glow
      >
        — or leaks.
      </KineticLine>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90, background: "#000" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "#000" }} />
    </AbsoluteFill>
  );
};
