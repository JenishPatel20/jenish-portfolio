'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = '#7eb8f7';

function seededUnit(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

// R3F v9 uses THREE.Clock internally; Three.js r168+ deprecated it.
// Suppress the warning until R3F updates to THREE.Timer.
function useSuppressThreeClockWarning() {
  useEffect(() => {
    const original = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
      original(...args);
    };
    return () => { console.warn = original; };
  }, []);
}

// ── Camera parallax — follows mouse subtly ─────────────────────────────────────
function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.45 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Orbital ring + traveling dots ──────────────────────────────────────────────
function OrbitalRing({
  radius,
  tilt,
  speed,
  numDots = 2,
  opacity = 0.38,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  numDots?: number;
  opacity?: number;
}) {
  const dotsRef = useRef<(THREE.Mesh | null)[]>([]);
  const t = useRef((radius + Math.abs(speed)) * Math.PI);

  useFrame((_, delta) => {
    t.current += delta * speed;
    dotsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const angle = t.current + (i / numDots) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle) * radius;
      mesh.position.z = 0;
    });
  });

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.011, 6, 128]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={opacity} />
      </mesh>
      {Array.from({ length: numDots }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
        >
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
      ))}
    </group>
  );
}

// ── Scattered star field ───────────────────────────────────────────────────────
function StarField() {
  const geometry = useMemo(() => {
    const positions = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      const r = 2.9 + seededUnit(i * 3 + 1) * 2.2;
      const theta = seededUnit(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededUnit(i * 3 + 3) - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={ACCENT}
        size={0.02}
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Pulsating core + atmosphere ────────────────────────────────────────────────
function Core() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    const mat = coreRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 1.1) * 0.15;
  });

  return (
    <>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.5}
          metalness={0.45}
          roughness={0.12}
        />
      </mesh>
      {/* Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.055} side={THREE.BackSide} />
      </mesh>
      {/* Outer glow shell */}
      <mesh>
        <sphereGeometry args={[0.88, 32, 32]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.022} side={THREE.BackSide} />
      </mesh>
      {/* Equatorial detail ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.008, 6, 80]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.55} />
      </mesh>
    </>
  );
}

// ── Slowly auto-rotating scene group ──────────────────────────────────────────
function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      <Core />
      {/* Three rings at different orbital inclinations — gyroscope effect */}
      <OrbitalRing radius={1.8}  tilt={[Math.PI / 2, 0, 0]}   speed={0.38}  numDots={2} opacity={0.40} />
      <OrbitalRing radius={1.5}  tilt={[0.3, 0, 1.05]}        speed={-0.28} numDots={2} opacity={0.30} />
      <OrbitalRing radius={2.2}  tilt={[1.2, 0.55, 0.2]}      speed={0.22}  numDots={3} opacity={0.25} />
      <StarField />
    </group>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export function OrbitalSphereScene() {
  useSuppressThreeClockWarning();
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.22} />
      <pointLight color={ACCENT} intensity={5} distance={8} />
      <pointLight color="#ffffff" intensity={0.55} position={[5, 3, 2]} />
      <CameraRig />
      <RotatingGroup />
    </Canvas>
  );
}
