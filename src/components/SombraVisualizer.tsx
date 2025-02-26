import { FC, useEffect, useRef } from 'react';
import { Container } from '@mui/material';

interface SombraVisualizerProps {
  volume: number;
  isUserSpeaking: boolean;
}

export const SombraVisualizer: FC<SombraVisualizerProps> = ({ volume, isUserSpeaking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sphere
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50 * (1 + volume * 0.5);

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      const color = isUserSpeaking ? '#00ff00' : '#ffffff';
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');

      // Draw circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();
  }, [volume, isUserSpeaking]);

  return (
    <Container sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
      <canvas 
        ref={canvasRef}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      />
    </Container>
  );
};
