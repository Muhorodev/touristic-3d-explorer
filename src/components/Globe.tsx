import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
    if (materialRef.current) {
      // Create a pulsing effect with the emissive intensity
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5;
      materialRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <Sphere ref={globeRef} args={[1, 64, 64]}>
      <meshStandardMaterial
        ref={materialRef}
        color="#1a1a1a"
        metalness={0.8}
        roughness={0.2}
        emissive="#d4af37"
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </Sphere>
  );
};