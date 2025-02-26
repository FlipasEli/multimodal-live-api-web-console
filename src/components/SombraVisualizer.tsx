import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { AudioSphere } from './AudioSphere';
import { Container } from '@mui/material';

interface SombraVisualizerProps {
  volume: number;
  isUserSpeaking: boolean;
}

export const SombraVisualizer: FC<SombraVisualizerProps> = ({ volume, isUserSpeaking }) => {
  return (
   <Container sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' ,pointerEvents: 'none',zIndex: 0}}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ background: 'transparent' }}>
        <AudioSphere volume={volume} isUserSpeaking={isUserSpeaking} />
        <EffectComposer>
          <Bloom intensity={1} luminanceThreshold={0.99} luminanceSmoothing={2} height={2} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </Container>
  );
};
