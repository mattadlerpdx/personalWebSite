import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

function getResponsiveCameraRadius(width, height) {
  const aspectRatio = width / height;
  const baseRadius = 2.5;
  const baseAspect = 16 / 9;
  const scale = baseAspect / aspectRatio;

  let radius = baseRadius * scale;

  // New: widen distance for medium-narrow screens (~875px or smaller)
  if (width < 900) radius *= 1.2;
  if (width < 768) radius *= 1.35;
  if (width < 500) radius *= 1.5;

  return Math.min(Math.max(radius, 2.5), 5); // Clamp for safety
}


function FlyoverCamera({ travelComplete, exiting }) {
  const { camera, size } = useThree();
  const tRef = useRef(0);
  const radiusRef = useRef(getResponsiveCameraRadius(size.width, size.height));
  const pitchUpRef = useRef(0);
  const pitchRightRef = useRef(0);

  useEffect(() => {
    camera.aspect = size.width / size.height;

    // ✅ Slightly wider field of view on small screens
    camera.fov = size.width < 768 ? 65 : 75;
    camera.updateProjectionMatrix();

    radiusRef.current = getResponsiveCameraRadius(size.width, size.height);
  }, [size, camera]);

  useFrame(() => {
    tRef.current += 0.002;
    const lon = tRef.current;

    const lat =
      size.width < 500 ? 0.5 :
        size.width < 768 ? 0.6 :
          size.width < 900 ? 0.68 :
            0.75;


    if (exiting.current) {
      radiusRef.current += 0.008;
      if (pitchUpRef.current < 0.8) {
        pitchUpRef.current += 0.0004;
        pitchRightRef.current += 0.0003;
      }
    }

const r = getResponsiveCameraRadius(size.width, size.height);
    const x = r * Math.cos(lat) * Math.cos(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.sin(lon);

    camera.position.set(x, y, z);

    const lookAheadLon = lon + 0.05;
    const lookX = r * Math.cos(lat) * Math.cos(lookAheadLon);
    const lookY = r * Math.sin(lat) + pitchUpRef.current;
    const lookZ = r * Math.cos(lat) * Math.sin(lookAheadLon);

    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

function StaticSphere() {
  const { size } = useThree();

  // ✅ Slightly enlarge the sphere on very small screens (e.g., iPhone SE)
  const scale = size.width < 450 ? 1.4 : 1;

  return (
    <mesh scale={[scale, scale, scale]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial wireframe color="#00" />
    </mesh>
  );
}

export default function GreetingOverlay3D({ onComplete }) {
  const textRef = useRef();
  const overlayRef = useRef();
  const travelComplete = useRef(false);
  const exiting = useRef(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    )
      .to(
        textRef.current,
        { opacity: 0, y: -20, duration: 1.2, delay: 1.5, ease: 'power2.inOut' }
      )
      .add(() => {
        travelComplete.current = true;
        exiting.current = true;
      })
      .to(
        overlayRef.current,
        { opacity: 0, duration: 1.5, ease: 'power2.inOut' },
        "+=0.3"
      )
      .add(() => {
        onComplete();
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black text-white transition-opacity duration-1000"
    >
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <StaticSphere />
        <FlyoverCamera travelComplete={travelComplete} exiting={exiting} />
      </Canvas>

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-3xl md:text-4xl font-semibold tracking-tight px-4"
      >
        <p>Hello, I'm Matt —</p>
        <p>engineer, system builder, explorer.</p>
      </div>
    </div>
  );
}
