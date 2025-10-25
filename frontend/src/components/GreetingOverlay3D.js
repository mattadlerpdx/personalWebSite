import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { DURATIONS, EASINGS } from '../utils/animationConstants';

function getResponsiveCameraRadius() {
  return 2.5;
}

function FlyoverCamera() {
  const { camera, size } = useThree();
  const tRef = useRef(0);
  const radius = getResponsiveCameraRadius();

  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.fov = size.width < 768 ? 65 : 75;
    camera.updateProjectionMatrix();
  }, [size, camera]);

  useFrame(() => {
    tRef.current += 0.002;
    const lon = tRef.current;
    const lat =
      size.width < 500 ? 0.5 :
      size.width < 768 ? 0.6 :
      size.width < 900 ? 0.68 : 0.75;

    const r = radius;
    const x = r * Math.cos(lat) * Math.cos(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.sin(lon);

    camera.position.set(x, y, z);

    const lookAheadLon = lon + 0.08;
    const lookX = r * Math.cos(lat) * Math.cos(lookAheadLon);
    const lookY = r * Math.sin(lat);
    const lookZ = r * Math.cos(lat) * Math.sin(lookAheadLon);

    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

function StaticSphere() {
  const { size } = useThree();
  const baseWidth = 900;
  const slope = 0.0004;
  const scale = Math.max(1, Math.min(1.18, +(1 + (baseWidth - size.width) * slope)));
  return (
    <mesh scale={[scale, scale, scale]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial wireframe color="#ffffff" />
    </mesh>
  );
}

export default function GreetingOverlay3D({ onComplete }) {
  const overlayRef = useRef();
  const contentRef = useRef();
  const textRef = useRef();
  const hasFadedOut = useRef(false);

  // Shared function to fade out content and call onComplete
  const triggerFadeOut = () => {
    if (hasFadedOut.current) return;
    hasFadedOut.current = true;
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: DURATIONS.SLOW,
      ease: EASINGS.SMOOTH,
      onComplete: onComplete,
    });
  };

  // Timed animation sequence
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH }
    )
      .to(
        textRef.current,
        { opacity: 0, y: -20, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH },
        '+=0.8'
      )
      .add(triggerFadeOut, '-=0.3');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      onClick={triggerFadeOut}
      className="fixed inset-0 z-50 bg-black text-white cursor-pointer"
    >
      <div
        ref={contentRef}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative w-full min-h-screen">
          <Canvas
            className="absolute inset-0"
            dpr={[1, 2]}
            style={{ width: '100vw', height: '100vh' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <StaticSphere />
            <FlyoverCamera />
          </Canvas>
        </div>

        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col justify-center items-center text-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight px-4"
        >
          <p>Hello, I'm Matt —</p>
          <p>engineer, system builder, explorer.</p>
        </div>
      </div>
    </div>
  );
}
