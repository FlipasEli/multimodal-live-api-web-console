import { Color } from 'three';

export const userColor = new Color(0x38b2ac); // Teal color
export const otherColor = new Color(0x805ad5); // Purple color

export const sphereShader = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 }, // 0 = other, 1 = user
    uIntensity: { value: 0.5 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uProgress;
    uniform float uIntensity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Simple noise function
    float noise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
    }
    
    void main() {
      // Base colors
      vec3 otherColor = vec3(0.50, 0.35, 0.84); // Purple
      vec3 userColor = vec3(0.22, 0.70, 0.67);  // Teal
      
      // Blend between colors based on progress
      vec3 baseColor = mix(otherColor, userColor, uProgress);
      
      // Add some noise based on time and position
      float noiseValue = noise(vPosition * 2.0 + uTime * 0.1);
      
      // Create pulsating effect
      float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
      
      // Adjust intensity based on speaking status
      float edge = 0.6 + 0.4 * uIntensity;
      
      // Fresnel effect - more emissive at edges
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      // Combine effects
      float alpha = fresnel * (0.3 + 0.7 * pulse);
      
      // Add noise to color
      vec3 finalColor = baseColor + noiseValue * 0.1;
      
      // Output with transparency
      gl_FragColor = vec4(finalColor, alpha * uIntensity);
    }
  `
}; 