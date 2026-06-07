import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { PrivacyCore } from "../three/PrivacyCore";
import { KineticLine, Badge, TEAL } from "../components/Overlay";

// Scene 3 — the differentiator: autonomous, compliant, contained by design.
export const ScenePrivacy: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#03060d" }}>
      <ThreeCanvas
        width={1920}
        height={1080}
        camera={{ position: [0, 0.5, 7], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#03060d"]} />
        <fogExp2 attach="fog" args={[new THREE.Color("#04101f"), 0.04]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 6]} intensity={50} color="#bfe9ff" distance={40} />
        <pointLight position={[-4, -2, 4]} intensity={30} color={TEAL} distance={30} />
        <PrivacyCore />
      </ThreeCanvas>

      <KineticLine start={14} size={58} tracking={1} top="14%">
        Autonomous. Compliant.
      </KineticLine>
      <KineticLine
        start={40}
        size={58}
        weight={900}
        tracking={1}
        color={TEAL}
        top="23%"
        glow
      >
        Private by design.
      </KineticLine>

      {/* compliance badges */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        {["SOC 2 Type II", "GDPR", "HIPAA", "Zero Retention"].map((b, i) => (
          <Badge key={b} label={b} start={70} index={i} />
        ))}
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90, background: "#000" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "#000" }} />
    </AbsoluteFill>
  );
};
