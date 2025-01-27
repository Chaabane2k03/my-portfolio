"use client";   
import React, { useRef } from "react";
import { Canvas  , useFrame } from "@react-three/fiber";

function SpinningCube() {
  const cubeRef = useRef();

  // Rotate the cube in the animation loop
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function EarthScene() {
  return (
    <Canvas>
      {/* Add a light to illuminate the cube */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* Add the spinning cube */}
      <SpinningCube />
    </Canvas>
  );
}
