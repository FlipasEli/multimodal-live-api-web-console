import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Mesh } from 'three';

interface AudioSphereProps {
  volume: number;
  isUserSpeaking: boolean;
}

export const AudioSphere = ({ volume, isUserSpeaking }: AudioSphereProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.scale.setScalar(1 + volume * 0.5);
    }
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[1, 32, 32]}>
        <meshPhongMaterial 
          color={isUserSpeaking ? "#00ff00" : "#ffffff"}
          emissive={isUserSpeaking ? "#00ff00" : "#ffffff"}
          emissiveIntensity={0.5 + volume * 2}
        />
      </Sphere>
    </mesh>
  );
};
