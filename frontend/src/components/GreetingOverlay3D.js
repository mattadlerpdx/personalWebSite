import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';

function FlyoverCamera({ travelComplete, exiting }) {
  const { camera } = useThree();
  const tRef = useRef(0);
  const radiusRef = useRef(2.5); // initial camera altitude
  const pitchUpRef = useRef(0);  // look-at Y offset
  const pitchRightRef = useRef(0);    // rightward look offset

  useFrame(() => {
    tRef.current += 0.002; // forward motion (keep this steady)

    const lon = tRef.current;
    const lat = 0.75;


    if (exiting.current) {
      radiusRef.current += 0.008; // gentle ascent
      if (pitchUpRef.current < 0.8) {
        pitchUpRef.current += 0.0004; // tilt up
        pitchRightRef.current += 0.0003; // pan right
      }
    }

    const r = radiusRef.current;
    const x = r * Math.cos(lat) * Math.cos(lon);
    const y = r * Math.sin(lat);
    const z = r * Math.cos(lat) * Math.sin(lon);

    camera.position.set(x, y, z);

    // Look forward & slightly upward as we exit
    const lookAheadLon = lon + 0.05;
    const lookX = r * Math.cos(lat) * Math.cos(lookAheadLon);
    const lookY = r * Math.sin(lat) + pitchUpRef.current;
    const lookZ = r * Math.cos(lat) * Math.sin(lookAheadLon);

    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}


function StaticSphere() {
  return (
    <mesh>
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
        exiting.current = true; // initiate flyaway
      })
      .to(
        overlayRef.current,
        { opacity: 0, duration: 2.5, ease: 'power2.inOut' },
        "+=1"
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
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-3xl font-semibold tracking-tight"
      >
        <p>Hello, I'm Matt —</p>
        <p>engineer, system builder, explorer.</p>
      </div>
    </div>
  );
}
