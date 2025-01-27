"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

function Model({ url }) {
  const { scene } = useGLTF(url); // Load the GLB file
  const modelRef = useRef();

  // Automatically rotate the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate around the Y-axis
    }

    

  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={[0.25, 0.5, 0.5]} // Adjust the size of the model
      position={[0, 1.5, 0]} // Adjust the position if needed
    />
  );
}

export default function RetroComputer() {
  return (
    <Canvas
      style={{ height: "100vh", width: "100%" }}
      camera={{ position: [0, 0, 5], fov: 50 }} // Adjust camera position and field of view
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url="/models/retro_computer.glb" />
    </Canvas>
  );
}