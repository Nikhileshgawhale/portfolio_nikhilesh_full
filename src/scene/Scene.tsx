import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  MeshReflectorMaterial,
  RoundedBox,
  Sparkles,
  Text,
  useCursor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { cameraPoses, SectionId, View } from "./stations";
import { getAssetUrl } from "../utils/assets";

const ORANGE = new THREE.Color("#ff4d00");
const MINT = new THREE.Color("#00e5a0");
const DISPLAY_FONT = getAssetUrl("fonts/syne-latin-800-normal.woff");
const MONO_FONT = getAssetUrl("fonts/jetbrains-mono-latin-500-normal.woff");

type SceneProps = {
  view: View;
  onSelect: (view: View) => void;
  panelOpen: boolean;
  onReady: () => void;
};

export default function Scene({ view, onSelect, panelOpen, onReady }: SceneProps) {
  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 4, 16], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={() => setTimeout(onReady, 600)}
      onPointerMissed={() => view !== "home" && onSelect("home")}
    >
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 12, 30]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 4.5, -4]} intensity={30} distance={14} color="#ff5a1f" />
      <pointLight position={[0, 2, 1.5]} intensity={12} distance={8} color="#00e5a0" />
      <pointLight position={[-5, 4, 2]} intensity={14} distance={12} color="#7c5cff" />
      <pointLight position={[5, 4, 1]} intensity={12} distance={12} color="#2fb7ff" />

      <CameraRig view={view} panelOpen={panelOpen} />

      <Room />
      <NeonSign view={view} onSelect={onSelect} />
      <NeuralCore view={view} onSelect={onSelect} />
      <Workstation view={view} onSelect={onSelect} />
      <ServerRacks view={view} onSelect={onSelect} />
      <Terminal view={view} onSelect={onSelect} />
      <Bookshelf view={view} onSelect={onSelect} />

      <Sparkles count={80} scale={[14, 6, 12]} position={[0, 3, 0]} size={2.5} speed={0.3} color="#00e5a0" opacity={0.6} />
      <Sparkles count={40} scale={[14, 6, 12]} position={[0, 3, 0]} size={2} speed={0.2} color="#ff7a3d" opacity={0.5} />

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.75} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
        <Vignette eskil={false} offset={0.25} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}

/* ---------- camera ---------- */

// Track the mouse at window level so parallax keeps working while it is over the UI overlay.
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function CameraRig({ view, panelOpen }: { view: View; panelOpen: boolean }) {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3(...cameraPoses.home.target));
  const goal = useMemo(() => new THREE.Vector3(), []);
  const goalTarget = useMemo(() => new THREE.Vector3(), []);
  const offset = useRef(0);

  useFrame((_, dt) => {
    const pose = cameraPoses[view];
    const k = 1 - Math.exp(-dt * 2.4);
    goalTarget.set(...pose.target);
    goal.set(...pose.position);

    // Pull the camera back on narrow / portrait screens so everything fits.
    const aspect = size.width / size.height;
    const narrow = aspect < 1.2;
    if (narrow) goal.sub(goalTarget).multiplyScalar(view === "home" ? 1.45 : 1.15).add(goalTarget);
    const cam = camera as THREE.PerspectiveCamera;
    const fov = narrow ? Math.min(72, THREE.MathUtils.radToDeg(2 * Math.atan((0.414 * 1.25) / aspect))) : 45;
    if (Math.abs(cam.fov - fov) > 0.01) cam.fov = fov;

    const parallax = view === "home" ? 0.8 : 0.18;
    goal.x += pointer.x * parallax;
    goal.y += pointer.y * parallax * 0.5;

    camera.position.lerp(goal, k);
    target.current.lerp(goalTarget, k);
    camera.lookAt(target.current);

    // Slide the rendered view left when the side panel covers the right of the screen.
    const wantOffset = panelOpen && size.width >= 1024 ? size.width * 0.22 : 0;
    offset.current += (wantOffset - offset.current) * k;
    cam.setViewOffset(size.width, size.height, offset.current, 0, size.width, size.height);
  });
  return null;
}

/* ---------- shared hotspot ---------- */

type StationProps = { view: View; onSelect: (view: View) => void };

function Hotspot({
  id,
  view,
  onSelect,
  label,
  labelPosition,
  children,
}: StationProps & {
  id: SectionId;
  label: string;
  labelPosition: [number, number, number];
  children: (hovered: boolean) => React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {children(hovered)}
      {view === "home" && (
        <Html position={labelPosition} center zIndexRange={[20, 0]}>
          <button
            type="button"
            onClick={() => onSelect(id)}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            className={`hotspot ${hovered ? "hotspot--on" : ""}`}
          >
            <span className="hotspot-dot" />
            {label}
          </button>
        </Html>
      )}
    </group>
  );
}

/* ---------- room ---------- */

function Room() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={18}
          roughness={1}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a10"
          metalness={0.6}
          mirror={0}
        />
      </mesh>
      <gridHelper args={[40, 40, "#1d1d2a", "#14141d"]} position={[0, 0.003, 0]} />
      <mesh position={[0, 6, -6.2]}>
        <planeGeometry args={[40, 12]} />
        <meshStandardMaterial color="#0b0b11" roughness={0.9} />
      </mesh>
      {/* neon strips along the back wall base */}
      <mesh position={[0, 0.05, -6.1]}>
        <boxGeometry args={[18, 0.04, 0.04]} />
        <meshBasicMaterial color={[0.4, 1.6, 1.1]} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- about: neon sign ---------- */

function NeonSign(props: StationProps) {
  const nameMat = useRef<THREE.MeshBasicMaterial>(null!);
  const flicker = useRef(0);
  useFrame((state) => {
    if (flicker.current > 0) flicker.current -= 1;
    else if (Math.random() < 0.004) flicker.current = 6 + Math.floor(Math.random() * 8);
    const off = flicker.current > 0 && flicker.current % 3 !== 0;
    const pulse = 2.4 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
    const i = off ? 0.5 : pulse;
    nameMat.current.color.setRGB(ORANGE.r * i, ORANGE.g * i + 0.05, ORANGE.b * i);
  });

  return (
    <Hotspot {...props} id="about" label="About me" labelPosition={[0, 5.3, -5.8]}>
      {(hovered) => (
        <group position={[0, 0, -5.9]}>
          <Text font={DISPLAY_FONT} fontSize={1.05} letterSpacing={0.06} position={[0, 4.05, 0]} anchorX="center" anchorY="middle">
            NIKHILESH
            <meshBasicMaterial ref={nameMat} toneMapped={false} />
          </Text>
          <Text font={MONO_FONT} fontSize={0.26} letterSpacing={0.32} position={[0, 3.05, 0]} anchorX="center" anchorY="middle">
            GENERATIVE AI · ML ENGINEER
            <meshBasicMaterial color={[MINT.r * 2, MINT.g * 2, MINT.b * 2]} toneMapped={false} />
          </Text>
          {/* neon frame */}
          <NeonFrame width={7.4} height={2.6} y={3.65} intensity={hovered ? 3 : 1.6} />
        </group>
      )}
    </Hotspot>
  );
}

function NeonFrame({ width, height, y, intensity }: { width: number; height: number; y: number; intensity: number }) {
  const t = 0.035;
  const color: [number, number, number] = [0.5 * intensity, 0.36 * intensity, 1.0 * intensity];
  const bars: [number, number, number, number, number][] = [
    [0, y + height / 2, width, t, 0],
    [0, y - height / 2, width, t, 0],
    [-width / 2, y, t, height, 0],
    [width / 2, y, t, height, 0],
  ];
  return (
    <group>
      {/* invisible backing so the whole sign is clickable */}
      <mesh position={[0, y, -0.02]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {bars.map(([x, by, w, h], i) => (
        <mesh key={i} position={[x, by, 0]}>
          <boxGeometry args={[w, h, t]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- skills: neural core ---------- */

function NeuralCore(props: StationProps) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const scale = useRef(1);

  const { nodes, linePositions } = useMemo(() => {
    const count = 54;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(1.35));
    }
    const segs: number[] = [];
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((o) => o.j > i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => segs.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z));
    });
    return { nodes: pts, linePositions: new Float32Array(segs) };
  }, []);

  const nodeMesh = useRef<THREE.InstancedMesh>(null!);
  React.useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    nodes.forEach((p, i) => nodeMesh.current.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)));
    nodeMesh.current.instanceMatrix.needsUpdate = true;
  }, [nodes]);

  return (
    <Hotspot {...props} id="skills" label="Skills" labelPosition={[1.75, 1.2, 0.4]}>
      {(hovered) => {
        return (
          <group position={[0, 1.95, 0]}>
            <CoreAnimator group={group} inner={inner} scale={scale} hovered={hovered} />
            <group ref={group}>
              <mesh ref={inner}>
                <sphereGeometry args={[0.38, 32, 32]} />
                <meshBasicMaterial color={[1.6, 0.42, 0.08]} toneMapped={false} />
              </mesh>
              <mesh>
                <icosahedronGeometry args={[0.85, 1]} />
                <meshBasicMaterial color={[0.2, 1.1, 0.75]} wireframe toneMapped={false} transparent opacity={0.45} />
              </mesh>
              <instancedMesh ref={nodeMesh} args={[undefined, undefined, nodes.length]}>
                <sphereGeometry args={[0.03, 10, 10]} />
                <meshBasicMaterial color={[0.4, 1.5, 1.1]} toneMapped={false} />
              </instancedMesh>
              <lineSegments>
                <bufferGeometry>
                  <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color="#00e5a0" transparent opacity={hovered ? 0.9 : 0.45} />
              </lineSegments>
              {/* invisible hit sphere */}
              <mesh>
                <sphereGeometry args={[1.45, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </group>
            {/* pedestal */}
            <mesh position={[0, -1.7, 0]}>
              <cylinderGeometry args={[0.95, 1.1, 0.5, 48]} />
              <meshStandardMaterial color="#111118" metalness={0.8} roughness={0.35} />
            </mesh>
            <mesh position={[0, -1.43, 0]} rotation-x={Math.PI / 2}>
              <torusGeometry args={[0.95, 0.025, 12, 64]} />
              <meshBasicMaterial color={[0.3, 1.8, 1.2]} toneMapped={false} />
            </mesh>
          </group>
        );
      }}
    </Hotspot>
  );
}

function CoreAnimator({
  group,
  inner,
  scale,
  hovered,
}: {
  group: React.MutableRefObject<THREE.Group>;
  inner: React.MutableRefObject<THREE.Mesh>;
  scale: React.MutableRefObject<number>;
  hovered: boolean;
}) {
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y += dt * (hovered ? 0.6 : 0.22);
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    group.current.position.y = Math.sin(t * 0.8) * 0.08;
    scale.current += ((hovered ? 1.08 : 1) - scale.current) * Math.min(1, dt * 6);
    group.current.scale.setScalar(scale.current);
    inner.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.08);
  });
  return null;
}

/* ---------- experience: workstation ---------- */

const CODE = [
  "from rag import Retriever, Reranker",
  "from tuning import lora_finetune",
  "",
  "# 10k-doc financial corpus",
  "docs = ingest(\"s3://filings/\")",
  "chunks = chunk(docs, strategy=\"semantic\")",
  "index = embed(chunks).hybrid(bm25=True)",
  "",
  "def answer(q):",
  "    hits = rerank(index.search(q, k=40))",
  "    out = llm(q, context=hits[:8])",
  "    assert grounded(out, hits)",
  "    return out",
  "",
  "evaluate(gold_set=500)  # 0.70 -> 0.80",
];
const KEYWORDS = /\b(from|import|def|return|assert)\b/g;

function useCodeTexture() {
  const { ctx, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 400;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { ctx, texture };
  }, []);
  const state = useRef({ acc: 0, chars: 0 });
  const total = CODE.join("\n").length;

  useFrame((_, dt) => {
    const s = state.current;
    s.acc += dt;
    if (s.acc < 0.035) return;
    s.acc = 0;
    s.chars = s.chars > total + 90 ? 0 : s.chars + 1;

    ctx.fillStyle = "#06100d";
    ctx.fillRect(0, 0, 640, 400);
    ctx.fillStyle = "#0d1f1a";
    ctx.fillRect(0, 0, 640, 30);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(18 + i * 18, 15, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "15px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#6b8f84";
    ctx.fillText("rag_pipeline.py — RP-Tech", 80, 20);

    let remaining = s.chars;
    let y = 58;
    ctx.font = "17px 'JetBrains Mono', monospace";
    for (const line of CODE) {
      if (remaining <= 0) break;
      const shown = line.slice(0, remaining);
      remaining -= line.length + 1;
      if (shown.trim().startsWith("#") || shown.includes("  #")) ctx.fillStyle = "#4f6b63";
      else ctx.fillStyle = "#c9f5e8";
      ctx.fillText(shown, 18, y);
      // overdraw keywords in orange
      ctx.fillStyle = "#ff7a3d";
      for (const m of shown.matchAll(KEYWORDS)) {
        ctx.fillText(m[0], 18 + ctx.measureText(shown.slice(0, m.index)).width, y);
      }
      if (remaining <= 0 && Math.floor(performance.now() / 400) % 2 === 0) {
        ctx.fillStyle = "#00e5a0";
        ctx.fillRect(18 + ctx.measureText(shown).width + 2, y - 15, 9, 18);
      }
      y += 22.5;
    }
    texture.needsUpdate = true;
  });
  return texture;
}

function Workstation(props: StationProps) {
  const texture = useCodeTexture();
  return (
    <Hotspot {...props} id="experience" label="Experience" labelPosition={[-4.4, 2.75, -1.8]}>
      {(hovered) => (
        <group position={[-4.4, 0, -1.8]} rotation-y={0.55}>
          <group position={[0, 0, 0]}>
            {/* desk */}
            <RoundedBox args={[2.8, 0.08, 1.2]} radius={0.02} position={[0, 1.0, 0]}>
              <meshStandardMaterial color="#17171f" metalness={0.5} roughness={0.4} />
            </RoundedBox>
            {[-1.3, 1.3].map((x) => (
              <mesh key={x} position={[x, 0.5, 0]}>
                <boxGeometry args={[0.06, 1, 1.1]} />
                <meshStandardMaterial color="#101016" metalness={0.6} roughness={0.4} />
              </mesh>
            ))}
            <mesh position={[0, 1.0, 0.6]}>
              <boxGeometry args={[2.8, 0.02, 0.02]} />
              <meshBasicMaterial color={[1.8, 0.5, 0.15]} toneMapped={false} />
            </mesh>
            {/* monitor */}
            <mesh position={[0, 1.25, -0.25]}>
              <boxGeometry args={[0.08, 0.45, 0.08]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
            </mesh>
            <RoundedBox args={[1.9, 1.2, 0.07]} radius={0.03} position={[0, 1.85, -0.28]}>
              <meshStandardMaterial color="#0c0c11" metalness={0.6} roughness={0.3} />
            </RoundedBox>
            <mesh position={[0, 1.85, -0.24]}>
              <planeGeometry args={[1.8, 1.1]} />
              <meshBasicMaterial map={texture} toneMapped={false} color={hovered ? [1.5, 1.5, 1.5] : [1.05, 1.05, 1.05]} />
            </mesh>
            {/* side monitor */}
            <group position={[1.25, 1.8, -0.1]} rotation-y={-0.5}>
              <RoundedBox args={[0.7, 1.0, 0.06]} radius={0.03}>
                <meshStandardMaterial color="#0c0c11" metalness={0.6} roughness={0.3} />
              </RoundedBox>
              <mesh position={[0, 0, 0.035]}>
                <planeGeometry args={[0.62, 0.92]} />
                <meshBasicMaterial color="#0a0d1a" />
              </mesh>
              {[0.32, 0.18, 0.04, -0.1, -0.24].map((y, i) => (
                <mesh key={y} position={[-0.05 + (i % 2) * 0.05, y, 0.04]}>
                  <planeGeometry args={[0.42 - (i % 3) * 0.08, 0.05]} />
                  <meshBasicMaterial color={i % 2 ? [0.4, 0.3, 1.4] : [0.2, 1.2, 0.9]} toneMapped={false} />
                </mesh>
              ))}
            </group>
            {/* keyboard */}
            <RoundedBox args={[1.0, 0.035, 0.32]} radius={0.01} position={[0, 1.06, 0.25]}>
              <meshStandardMaterial color="#1c1c26" metalness={0.4} roughness={0.5} />
            </RoundedBox>
            {/* mug */}
            <mesh position={[-0.95, 1.13, 0.25]}>
              <cylinderGeometry args={[0.07, 0.06, 0.18, 20]} />
              <meshStandardMaterial color="#e8e2d6" roughness={0.6} />
            </mesh>
          </group>
        </group>
      )}
    </Hotspot>
  );
}

/* ---------- projects: server racks ---------- */

function ServerRacks(props: StationProps) {
  const leds = useRef<THREE.InstancedMesh>(null!);
  const ledData = useMemo(() => {
    const list: { pos: [number, number, number]; color: THREE.Color }[] = [];
    [-0.55, 0.55].forEach((rx) => {
      for (let u = 0; u < 9; u++) {
        for (let l = 0; l < 5; l++) {
          list.push({
            pos: [rx - 0.28 + l * 0.07, 0.35 + u * 0.24, 0.41],
            color: Math.random() > 0.3 ? MINT.clone() : ORANGE.clone(),
          });
        }
      }
    });
    return list;
  }, []);

  React.useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    ledData.forEach((d, i) => {
      leds.current.setMatrixAt(i, m.makeTranslation(...d.pos));
      leds.current.setColorAt(i, d.color);
    });
    leds.current.instanceMatrix.needsUpdate = true;
  }, [ledData]);

  const tmp = useMemo(() => new THREE.Color(), []);
  const acc = useRef(0);
  useFrame((_, dt) => {
    acc.current += dt;
    if (acc.current < 0.08) return;
    acc.current = 0;
    ledData.forEach((d, i) => {
      if (Math.random() < 0.12) {
        const on = Math.random() > 0.35;
        leds.current.setColorAt(i, tmp.copy(d.color).multiplyScalar(on ? 2.4 : 0.15));
      }
    });
    if (leds.current.instanceColor) leds.current.instanceColor.needsUpdate = true;
  });

  return (
    <Hotspot {...props} id="projects" label="Projects" labelPosition={[4.6, 3.25, -1.8]}>
      {(hovered) => (
        <group position={[4.6, 0, -1.8]} rotation-y={-0.55}>
          {[-0.55, 0.55].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <RoundedBox args={[1.0, 2.5, 0.8]} radius={0.03} position={[0, 1.25, 0]}>
                <meshStandardMaterial color="#121219" metalness={0.75} roughness={0.35} />
              </RoundedBox>
              {Array.from({ length: 9 }).map((_, u) => (
                <mesh key={u} position={[0, 0.35 + u * 0.24, 0.401]}>
                  <planeGeometry args={[0.88, 0.19]} />
                  <meshStandardMaterial color="#1a1a24" metalness={0.5} roughness={0.5} />
                </mesh>
              ))}
              <mesh position={[0, 2.52, 0]}>
                <boxGeometry args={[1.0, 0.025, 0.8]} />
                <meshBasicMaterial color={hovered ? [0.6, 3, 2] : [0.3, 1.6, 1.1]} toneMapped={false} />
              </mesh>
            </group>
          ))}
          <instancedMesh ref={leds} args={[undefined, undefined, ledData.length]}>
            <boxGeometry args={[0.035, 0.035, 0.01]} />
            <meshBasicMaterial toneMapped={false} />
          </instancedMesh>
          <Text font={MONO_FONT} fontSize={0.16} position={[0, 2.75, 0.2]} letterSpacing={0.2} anchorX="center">
            ./projects
            <meshBasicMaterial color={[0.5, 2, 1.5]} toneMapped={false} />
          </Text>
        </group>
      )}
    </Hotspot>
  );
}

/* ---------- contact: terminal ---------- */

function Terminal(props: StationProps) {
  const cursor = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    cursor.current.visible = Math.floor(state.clock.elapsedTime * 2) % 2 === 0;
  });
  return (
    <Hotspot {...props} id="contact" label="Contact" labelPosition={[3.6, 2.2, 3.6]}>
      {(hovered) => (
        <group position={[3.6, 0, 3.6]} rotation-y={-0.9}>
          <RoundedBox args={[1.0, 1.05, 0.7]} radius={0.04} position={[0, 0.525, 0]}>
            <meshStandardMaterial color="#141420" metalness={0.6} roughness={0.35} />
          </RoundedBox>
          <group position={[0, 1.35, -0.05]} rotation-x={-0.35}>
            <RoundedBox args={[1.0, 0.75, 0.5]} radius={0.04}>
              <meshStandardMaterial color="#141420" metalness={0.6} roughness={0.35} />
            </RoundedBox>
            <mesh position={[0, 0, 0.255]}>
              <planeGeometry args={[0.86, 0.6]} />
              <meshBasicMaterial color="#04100c" />
            </mesh>
            <Text font={MONO_FONT} fontSize={0.075} position={[-0.38, 0.2, 0.26]} anchorX="left" anchorY="top" maxWidth={0.8} lineHeight={1.5}>
              {"> ping nikhilesh\n< 200 OK · open to roles\n> say_hello"}
              <meshBasicMaterial color={[0.5, 2.2, 1.6]} toneMapped={false} />
            </Text>
            <mesh ref={cursor} position={[-0.0, -0.13, 0.26]}>
              <planeGeometry args={[0.04, 0.07]} />
              <meshBasicMaterial color={[0.5, 2.2, 1.6]} toneMapped={false} />
            </mesh>
          </group>
          <mesh position={[0, 1.06, 0.36]}>
            <boxGeometry args={[1.0, 0.02, 0.02]} />
            <meshBasicMaterial color={hovered ? [3, 0.9, 0.3] : [1.8, 0.5, 0.15]} toneMapped={false} />
          </mesh>
          {/* buttons */}
          {[-0.2, 0, 0.2].map((x, i) => (
            <mesh key={x} position={[x, 1.07, 0.2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
              <meshBasicMaterial color={i === 1 ? [2, 0.6, 0.2] : [0.4, 1.8, 1.3]} toneMapped={false} />
            </mesh>
          ))}
        </group>
      )}
    </Hotspot>
  );
}

/* ---------- blog: bookshelf ---------- */

const SPINE_COLORS: [number, number, number][] = [
  [1.8, 0.5, 0.12],
  [0.3, 1.6, 1.1],
  [0.55, 0.4, 1.6],
  [1.4, 1.1, 0.35],
  [0.3, 1.0, 1.7],
];

function Bookshelf(props: StationProps) {
  const books = useMemo(() => {
    const list: { x: number; y: number; w: number; h: number; tilt: number; color: [number, number, number]; glow: boolean }[] = [];
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    [0.32, 0.82, 1.32].forEach((shelfY, row) => {
      let x = -0.62;
      while (x < 0.56) {
        const w = 0.06 + rand() * 0.05;
        const h = 0.3 + rand() * 0.12;
        const glow = row === 1 && list.filter((b) => b.glow).length < 5 && rand() > 0.45;
        list.push({ x: x + w / 2, y: shelfY + h / 2, w, h, tilt: rand() > 0.9 ? 0.18 : 0, color: SPINE_COLORS[list.length % 5], glow });
        x += w + 0.012;
      }
    });
    return list;
  }, []);
  const holo = useRef<THREE.Group>(null!);
  useFrame((state) => {
    holo.current.rotation.y = state.clock.elapsedTime * 0.6;
    holo.current.position.y = 2.15 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
  });

  return (
    <Hotspot {...props} id="blog" label="Blog" labelPosition={[-4.9, 2.6, 2.1]}>
      {(hovered) => (
        <group position={[-4.9, 0, 2.1]} rotation-y={1.0}>
          {/* frame */}
          {[-0.7, 0.7].map((x) => (
            <mesh key={x} position={[x, 0.9, 0]}>
              <boxGeometry args={[0.05, 1.8, 0.4]} />
              <meshStandardMaterial color="#15151e" metalness={0.6} roughness={0.4} />
            </mesh>
          ))}
          {[0.3, 0.8, 1.3, 1.8].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <boxGeometry args={[1.45, 0.035, 0.4]} />
              <meshStandardMaterial color="#1a1a24" metalness={0.5} roughness={0.45} />
            </mesh>
          ))}
          <mesh position={[0, 1.82, 0.2]}>
            <boxGeometry args={[1.45, 0.02, 0.02]} />
            <meshBasicMaterial color={hovered ? [0.8, 0.6, 3] : [0.45, 0.35, 1.6]} toneMapped={false} />
          </mesh>
          {/* books */}
          {books.map((b, i) => (
            <mesh key={i} position={[b.x, b.y, 0.02]} rotation-z={b.tilt}>
              <boxGeometry args={[b.w, b.h, 0.28]} />
              {b.glow ? (
                <meshBasicMaterial color={b.color.map((c) => c * (hovered ? 1.6 : 1)) as [number, number, number]} toneMapped={false} />
              ) : (
                <meshStandardMaterial color={new THREE.Color(...b.color).multiplyScalar(0.18)} roughness={0.7} />
              )}
            </mesh>
          ))}
          {/* floating hologram "paper" */}
          <group ref={holo} position={[0, 2.15, 0]}>
            <mesh>
              <planeGeometry args={[0.32, 0.42]} />
              <meshBasicMaterial color={[0.3, 1.4, 1.0]} toneMapped={false} transparent opacity={0.35} side={THREE.DoubleSide} />
            </mesh>
            {[0.12, 0.06, 0, -0.06, -0.12].map((y, i) => (
              <mesh key={y} position={[i === 0 ? -0.03 : 0, y, 0.002]}>
                <planeGeometry args={[i === 0 ? 0.18 : 0.24, 0.018]} />
                <meshBasicMaterial color={[0.6, 2.2, 1.6]} toneMapped={false} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
          {/* hit area */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[1.5, 2.2, 0.5]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      )}
    </Hotspot>
  );
}
