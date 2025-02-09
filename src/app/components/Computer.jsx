"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

function Model({ url, onLoad }) {
  const { scene } = useGLTF(url); // Load the GLB file
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate around the Y-axis
    }
  });

  useEffect(() => {
    if (onLoad) {
      onLoad(); // Notify when the model is loaded
    }
  }, [onLoad]);

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={[0.25, 0.5, 0.5]} // Adjust the size of the model
      position={[0, 1.5, 0]} // Adjust the position if needed
    />
  );
}

export default function RetroComputer({ onLoad }) {
  return (
    <Canvas
      style={{ height: "100vh", width: "100%" }}
      camera={{ position: [0, 0, 5], fov: 50 }} // Adjust camera position and field of view
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url="/models/retro_computer.glb" onLoad={onLoad} />
    </Canvas>
  );
}
