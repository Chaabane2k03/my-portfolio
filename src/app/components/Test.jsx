"use client";
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Vector2, Vector3, ShaderMaterial } from 'three';
import { OrbitControls, Stars } from '@react-three/drei';

function Earth() {
  const earthRef = useRef(null);
  const { camera } = useThree();

  // Load textures
  const [colorMap] = useLoader(TextureLoader, [
    '/textures/earth_color_map.jpg', // Earth color texture
  ]);

  // Convert latitude/longitude to Cartesian coordinates
  const focusOnTunisia = () => {
    const latitude = 34; // Tunisia's latitude
    const longitude = 9; // Tunisia's longitude
    const radius = 2; // Earth's radius

    // Convert to radians
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    // Calculate Cartesian coordinates
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    // Focus the camera on Tunisia
    camera.position.set(x * 3, y * 3, z * 3); // Move camera back
    camera.lookAt(new Vector3(x, y, z)); // Look at Tunisia
  };

  // Rotate the Earth
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() / 6;
    }
  });

  // Focus on Tunisia when the component mounts
  useEffect(() => {
    focusOnTunisia();
  }, []);

  // Custom shader to highlight Tunisia
  const tunisiaShader = new ShaderMaterial({
    uniforms: {
      uTexture: { value: colorMap },
      uHighlightColor: { value: new Vector3(1, 0, 0) }, // Red color
      uHighlightPosition: { value: new Vector2(0.5, 0.5) }, // Tunisia's UV position
      uHighlightRadius: { value: 0.05 }, // Highlight radius
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform vec3 uHighlightColor;
      uniform vec2 uHighlightPosition;
      uniform float uHighlightRadius;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(uTexture, vUv);
        float distance = length(vUv - uHighlightPosition);
        if (distance < uHighlightRadius) {
          color.rgb = mix(color.rgb, uHighlightColor, 0.5);
        }
        gl_FragColor = color;
      }
    `,
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <primitive object={tunisiaShader} attach="material" />
    </mesh>
  );
}

function WhiteSphere() {
  return (
    <mesh position={[0, 0, 2.1]}> {/* Position the sphere on the surface of the Earth */}
      <sphereGeometry args={[0.1, 32, 32]} /> {/* Small sphere with radius 0.1 */}
      <meshStandardMaterial color="white" /> {/* White material */}
    </mesh>
  );
}

export default function EarthScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Earth />
      <WhiteSphere />
      <OrbitControls />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </Canvas>
  );
}