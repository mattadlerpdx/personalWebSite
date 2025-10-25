import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';
import { fetchAbout } from '../api';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';
import { DURATIONS, EASINGS } from '../utils/animationConstants';

export default function About() {
  const { darkMode } = useTheme();
  const [about, setAbout] = useState(null);
  const profileRef = useRef();
  const skillsRef = useRef();

  useEffect(() => {
    // Ensure we have a connected backend
    fetchAbout()
      .then((data) => setAbout(data))
      .catch((err) => console.error('Failed to fetch about info:', err));
  }, []);

  // Animate profile section when data loads
  useEffect(() => {
    if (about && profileRef.current) {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: DURATIONS.MEDIUM,
          ease: EASINGS.SMOOTH
        }
      );
    }
  }, [about]);

  // Animate skills section on mount
  useEffect(() => {
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: DURATIONS.MEDIUM,
          ease: EASINGS.SMOOTH,
          delay: 0.2 // Slight delay for stagger effect
        }
      );
    }
  }, []);

  return (
    <section className="w-full px-4 pb-24 transition-colors duration-300">
      {/* About Container */}
      {!about ? (
        <div className="group border rounded-lg shadow-sm transition-all duration-300 bg-white/5 text-white border-white/10 p-8 md:p-12 max-w-5xl mx-auto">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        </div>
      ) : (
      <a
        ref={profileRef}
        href="https://www.linkedin.com/in/mattadlerpdx"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-8 md:p-12 border rounded-lg shadow-sm transition-all duration-300 cursor-pointer bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] active:bg-gray-100 dark:active:bg-white/15 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10"
      >
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src="/images/linkinPhoto.jpg"
            alt="Matt Adler"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="w-full text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-1 pb-1 transition-all duration-300 group-hover:bg-gradient-miami group-hover:bg-200 group-hover:animate-shimmer group-hover:bg-clip-text group-hover:text-transparent">
            {about.name}
          </h2>
          <h3 className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-4">
            {about.title}
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed max-w-prose mx-auto md:mx-0 text-center md:text-left">
            With a foundation in systems programming and experience building a CGO WebSocket library at BlackBerry, I've since expanded into full-stack development—modernizing .NET/Go platforms, building cloud-native services, and integrating AI tools like the OpenAI API. My primary focus lies in scalable, AI-driven architectures and applied NLP. When I'm not coding, you can find me scaling one of the Cascades, on the wrestling mat, or exploring new trails.
          </p>


          {/* LinkedIn Icon Link */}
          <div className="mt-4 flex justify-center md:justify-start">
            <div className="hover:scale-110 transition-transform duration-200">
              <img
                src="/images/linkedInIcon.png"
                alt="LinkedIn"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </a>
      )}

      {/* TECH STACK Section - Always show, independent of backend */}
      <KaleidoscopeTechStack darkMode={darkMode} />

      {/* Skills Section */}
      <div ref={skillsRef} className="max-w-5xl mx-auto mt-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black dark:text-white text-center">
          Skills
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-black dark:text-white leading-relaxed max-w-prose mx-auto text-center mb-12">
          My technical background bridges full-stack development, systems engineering, and AI integration.
          While I've spent significant time modernizing .NET/Go-based platforms
          and building cloud-native services, my primary focus lies in scalable,
          AI-driven architectures and applied NLP.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Languages Card */}
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10">
            <h5 className="text-lg sm:text-xl font-bold mb-4">Languages</h5>
            <ul className="space-y-2 text-gray-800 dark:text-gray-300">
              <li>Go</li>
              <li>C#</li>
              <li>JavaScript</li>
              <li>SQL</li>
            </ul>
          </div>

          {/* Frameworks & Tools Card */}
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10">
            <h5 className="text-lg sm:text-xl font-bold mb-4">
              Frameworks & Tools
            </h5>
            <ul className="space-y-2 text-gray-800 dark:text-gray-300">
              <li>.NET</li>
              <li>Docker</li>
              <li>CI/CD</li>
            </ul>
          </div>

          {/* Cloud & APIs Card */}
          <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10">
            <h5 className="text-lg sm:text-xl font-bold mb-4">
              Cloud & APIs
            </h5>
            <ul className="space-y-2 text-gray-800 dark:text-gray-300">
              <li>Google Cloud</li>
              <li>OpenAI API</li>
              <li>GitHub / GitLab</li>
            </ul>
          </div>
        </div>
      </div>

    </section >
  );
}
