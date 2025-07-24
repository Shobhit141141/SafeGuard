'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Model() {
  const gltf = useGLTF('/model.glb');
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.005;
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={5} />;
}

export default function ThreeDViewer() {
  return (
    <div className="h-screen w-full mx-auto bg-black rounded-lg shadow-lg overflow-hidden">
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
        <spotLight position={[2, 5, 2]} angle={0.3} penumbra={0.5} intensity={0.8} castShadow />

        {/* Model  */}
        <Suspense fallback={null}>
          <Model />
          <Environment preset="forest" />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
        />
      </Canvas>
    </div>
  );
}
