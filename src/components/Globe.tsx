import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = {
    time: { value: 0 },
  };

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <Sphere ref={globeRef} args={[1, 64, 64]}>
      <shaderMaterial
        ref={shaderRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            vec3 baseColor = vec3(0.1, 0.1, 0.1);
            vec3 highlightColor = vec3(0.831, 0.686, 0.216);
            
            float pulse = sin(time * 2.0) * 0.5 + 0.5;
            float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            
            vec3 finalColor = mix(baseColor, highlightColor, fresnel * pulse);
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </Sphere>
  );
};