"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { useEffect } from "react";




function Model({
  onLoad,
  isHovering,
  isInteracting,
}: {
  onLoad?: () => void;
  isHovering: (hovering: boolean) => void;
  isInteracting: boolean;
}) {
  const gltf = useGLTF("/model2.glb");
  const modelRef = useRef<THREE.Group>(null);

  const [screenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const isSmallScreen = screenWidth < 768;
  const scale_lvl = isSmallScreen ? 20 : 32;


  useEffect(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    gltf.scene.position.sub(center);
    gltf.scene.scale.set(scale_lvl, scale_lvl, scale_lvl);
    onLoad?.();
  }, [gltf.scene, onLoad, scale_lvl]);


  useFrame(() => {
    if (modelRef.current && !isInteracting) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive
        object={gltf.scene}
        onPointerOver={() => isHovering(true)}
        onPointerOut={() => isHovering(false)}
      />
    </group>
  );
}

export default function Scene() {
  const [, setHovering] = useState(false);
  const [interacting, setInteracting] = useState(false);

  return (
    <div className="w-full h-screen bg-black">

      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 75,

        }}
        className="bg-transparent "
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            enablePan={true}
            enableRotate={true}
            minDistance={4.5}
            maxDistance={6}
            onStart={() => setInteracting(true)}
            onEnd={() => setInteracting(false)}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Model
            isHovering={setHovering}
            isInteracting={interacting}
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}


useGLTF.preload(
  `/model2.glb`
);
