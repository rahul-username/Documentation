import { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { mulberry32 } from "../utils";

// Generate a dark glass facade with a grid of randomly-lit windows.
const makeFacade = (seed: number) => {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#070b16";
  ctx.fillRect(0, 0, c.width, c.height);
  const rand = mulberry32(seed);
  const cols = 6;
  const rows = 14;
  const mw = 64 / cols;
  const mh = 128 / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const lit = rand();
      if (lit > 0.55) {
        // cool teal/blue office light, occasionally warm
        const warm = rand() > 0.85;
        ctx.fillStyle = warm
          ? `rgba(255,200,120,${0.5 + rand() * 0.5})`
          : `rgba(120,230,220,${0.4 + rand() * 0.6})`;
      } else {
        ctx.fillStyle = "rgba(20,30,55,0.9)";
      }
      ctx.fillRect(x * mw + 1.5, y * mh + 2, mw - 3, mh - 4);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
};

type Building = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  seed: number;
};

export const City: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const buildings = useMemo<Building[]>(() => {
    const rand = mulberry32(7);
    const list: Building[] = [];
    const grid = 9;
    const spacing = 4.2;
    for (let i = -grid; i <= grid; i++) {
      for (let j = -grid; j <= grid; j++) {
        // leave a central avenue
        if (Math.abs(i) < 1 && Math.abs(j) < 1) continue;
        const distance = Math.sqrt(i * i + j * j);
        const h = 2 + rand() * (10 - distance * 0.5) + (rand() > 0.9 ? 8 : 0);
        list.push({
          x: i * spacing + (rand() - 0.5) * 1.2,
          z: j * spacing + (rand() - 0.5) * 1.2,
          w: 1.8 + rand() * 1.2,
          d: 1.8 + rand() * 1.2,
          h: Math.max(1.5, h),
          seed: Math.floor(rand() * 1e6),
        });
      }
    }
    return list;
  }, []);

  // Shared small set of facade textures (cheaper than one per building).
  const facades = useMemo(
    () => new Array(6).fill(0).map((_, i) => makeFacade(100 + i)),
    []
  );

  // Slow flythrough: the whole city slides toward camera + gently rotates.
  const t = frame / durationInFrames;
  const z = interpolate(t, [0, 1], [-10, 6]);
  const rotY = interpolate(t, [0, 1], [-0.32, 0.08]);
  const lift = interpolate(frame, [0, 45], [-6, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <group position={[0, lift, z]} rotation={[0, rotY, 0]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#04060d" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Glowing avenue strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[2.4, 200]} />
        <meshBasicMaterial color="#0e7d70" transparent opacity={0.35} />
      </mesh>

      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color="#0a1222"
            emissive="#0a3b40"
            emissiveMap={facades[i % facades.length]}
            emissiveIntensity={1.4}
            metalness={0.5}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};
