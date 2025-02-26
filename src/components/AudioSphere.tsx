import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Color, Mesh, ShaderMaterial } from 'three';
import { Leva, useControls } from 'leva';
import { extend } from '@react-three/fiber';
import { sphereShader, userColor, otherColor } from '../shaders/sphereShader';


interface AudioSphereProps {
  volume: number;
  isUserSpeaking: boolean;
}

class CustomSphereMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: sphereShader.uniforms,
      vertexShader: sphereShader.vertexShader,
      fragmentShader: sphereShader.fragmentShader,
      transparent: true
    });
  }
}

extend({ CustomSphereMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customSphereMaterial: any;
    }
  }
}

export const AudioSphere = ({ volume, isUserSpeaking }: AudioSphereProps) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const { isUser } = useControls({
    isUser: false
  });

  const { scale, intensity, colorProgress } = useSpring({
    scale: 1 + volume * 0.5,
    intensity: 0.5 + volume * 2,
    colorProgress: isUserSpeaking ? 1 : 0,
    config: {
      tension: 120,
      friction: 14,
      mass: 1
    },
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.scale.setScalar(1 + volume * 0.5);
    }
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uProgress.value = colorProgress.get();
      materialRef.current.uniforms.uIntensity.value = intensity.get();
    }
  });

  return (
    <>
    <Leva hidden={true} />
    <mesh ref={meshRef}>
      <Sphere args={[1, 64, 64]}>
        <customSphereMaterial ref={materialRef} />
      </Sphere>
    </mesh>
    </>
  );
};
