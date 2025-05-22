import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

function getResponsiveCameraRadius() {
  return 2.5; // fixed distance for consistent scale
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

  // ⏩ Increase these values to speed up the pan-up effect
  if (pitchUpRef.current < 0.8) {
    pitchUpRef.current += 0.0012;  // was 0.0004
    pitchRightRef.current += 0.001; // was 0.0003
  }
}


const r = getResponsiveCameraRadius(size.width, size.height);
    const x = r * Math.cos(lat) * Math.cos(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.sin(lon);

    camera.position.set(x, y, z);

    const lookAheadLon = lon + 0.08;
    const lookX = r * Math.cos(lat) * Math.cos(lookAheadLon);
    const lookY = r * Math.sin(lat) + pitchUpRef.current;
    const lookZ = r * Math.cos(lat) * Math.sin(lookAheadLon);

    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

function StaticSphere() {
  const { size } = useThree();

const baseWidth = 900;
const slope = 0.0004;
const scale = Math.min(1.18, +(1 + (baseWidth - size.width) * slope).toFixed(3));



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
