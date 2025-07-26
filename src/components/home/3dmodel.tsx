"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";

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
  const [isModelCentered, setIsModelCentered] = useState(false);
  const [screenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const isSmallScreen = screenWidth < 768;
  const scale_lvl = isSmallScreen ? 20 : 32;

  // Use useCallback to ensure the centering function is stable
  const centerModel = useCallback(() => {
    if (gltf.scene && !isModelCentered) {
      // Clone the scene to avoid modifying the original
      const scene = gltf.scene.clone();
      
      // Wait for the next frame to ensure geometry is loaded
      requestAnimationFrame(() => {
        try {
          const box = new THREE.Box3().setFromObject(scene);
          
          // Check if the bounding box is valid
          if (!box.isEmpty()) {
            const center = new THREE.Vector3();
            box.getCenter(center);
            
            // Apply transformations to the original scene
            gltf.scene.position.sub(center);
            gltf.scene.scale.set(scale_lvl, scale_lvl, scale_lvl);
            
            setIsModelCentered(true);
            onLoad?.();
          }
        } catch (error) {
          console.error("Error centering model:", error);
          // Fallback: just apply scaling without centering
          gltf.scene.scale.set(scale_lvl, scale_lvl, scale_lvl);
          setIsModelCentered(true);
          onLoad?.();
        }
      });
    }
  }, [gltf.scene, isModelCentered, scale_lvl, onLoad]);

  useEffect(() => {
    centerModel();
  }, [centerModel]);

  useFrame(() => {
    if (modelRef.current && !isInteracting && isModelCentered) {
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
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 75,
        }}
        className="bg-transparent"
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
            onLoad={() => setModelLoaded(true)}
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
      
      {/* Optional loading indicator */}
      {!modelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading model...
        </div>
      )}
    </div>
  );
}

// Preload the model
useGLTF.preload("/model2.glb");