"use client";

import { Suspense, useRef, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html, useGLTF } from "@react-three/drei";
import type { Mesh, Group } from "three";

/**
 * Optional 3D viewer (React Three Fiber).
 *
 * Drop a model at /public/models/<id>.glb and set `model3dPath` on the vehicle
 * to enable the "3D" tab in Vehicle360Viewer. If the file is missing, a
 * rotating placeholder mesh is shown so the experience never breaks.
 *
 * Lighting is local (no HDR fetch) so it works offline.
 */
export function VehicleModel3D({ modelPath }: { modelPath: string }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4.5, 2, 5.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
        <spotLight position={[-6, 6, -4]} intensity={0.6} angle={0.5} penumbra={1} />

        <Suspense fallback={<CanvasLoader />}>
          <ModelErrorBoundary fallback={<PlaceholderMesh missing />}>
            <GLTFModel modelPath={modelPath} />
          </ModelErrorBoundary>
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.5}
            scale={12}
            blur={2.4}
            far={4}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.8}
          minDistance={4}
          maxDistance={9}
        />
      </Canvas>
    </div>
  );
}

function GLTFModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.4} position={[0, -1, 0]} />;
}

function CanvasLoader() {
  return (
    <Html center>
      <span className="text-xs text-muted">Chargement…</span>
    </Html>
  );
}

/** Rotating beveled block used when no .glb is available. */
function PlaceholderMesh({ missing }: { missing?: boolean }) {
  const ref = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group}>
      <mesh ref={ref} position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[3, 1.1, 1.4]} />
        <meshStandardMaterial color="#0284C7" metalness={0.4} roughness={0.35} />
      </mesh>
      {missing && (
        <Html center position={[0, 1.6, 0]}>
          <div className="whitespace-nowrap rounded-full border border-line bg-background/80 px-3 py-1.5 text-[11px] text-muted backdrop-blur-md">
            Modèle 3D à venir — ajoutez le fichier .glb
          </div>
        </Html>
      )}
    </group>
  );
}

/** Catches GLTF load failures (e.g. missing file) and shows the fallback. */
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
