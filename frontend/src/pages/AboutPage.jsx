import React from 'react';
import About from '../components/About';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';

export default function AboutPage({ darkMode }) {
  return (
    <div
      className={`w-full min-h-screen overflow-y-auto transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>
        <About darkMode={darkMode} />
      </div>

      <div className="mt-12 px-4">
        <KaleidoscopeTechStack darkMode={darkMode} />
      </div>
    </div>
  );
}

