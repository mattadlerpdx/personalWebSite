import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../api';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';
export default function About({ darkMode }) {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    // Ensure we have a connected backend
    fetchAbout()
      .then((data) => setAbout(data))
      .catch((err) => console.error('Failed to fetch about info:', err));
  }, []);

  if (!about)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );

  return (
    <section className="w-full px-4 pb-24 transition-colors duration-300">
      {/* About Container */}
      <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-md p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-1 text-gray-800 dark:text-gray-100">
            {about.name}
          </h2>
          <h3 className="text-xl sm:text-2xl text-black dark:text-white mb-4">
            {about.title}
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white leading-relaxed max-w-prose mx-auto md:mx-0 text-center md:text-left">
            With a foundation in systems programming and experience building a CGO WebSocket library at BlackBerry, I’ve since expanded into full-stack development—modernizing .NET/Go platforms, building cloud-native services, and integrating AI tools like the OpenAI API. My primary focus lies in scalable, AI-driven architectures and applied NLP. When I’m not coding, you can find me scaling one of the Cascades, on the wrestling mat, or exploring new trails.
          </p>


          {/* LinkedIn Icon Link */}
          <div className="mt-4 flex justify-center md:justify-start">
            <a href="https://www.linkedin.com/in/mattadlerpdx" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/linkedInIcon.png"
                alt="LinkedIn"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>



      {/* TECH STACK Section */}
      <KaleidoscopeTechStack darkMode={darkMode} />

      {/* Skills Section */}
      <div className=" bg-white dark:bg-black p-8 md:p-12 max-w-5xl mx-auto mt-16 md:pl-40 rounded-xl shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black dark:text-white text-center md:text-left">
          Skills
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-black dark:text-white leading-relaxed max-w-prose mx-auto md:mx-0 text-center md:text-left">
          My technical background bridges full-stack development, systems engineering, and AI integration.
          While I’ve spent significant time modernizing .NET/Go-based platforms
          and building cloud-native services, my primary focus lies in scalable,
          AI-driven architectures and applied NLP.
        </p>
        <div className="grid sm:grid-cols-3 gap-10 mt-12 text-center md:text-left">
          <div>
            <h5 className="text-lg sm:text-xl font-semibold mb-3">Languages</h5>
            <ul className="space-y-1 leading-relaxed">
              <li>Go</li>
              <li>C#</li>
              <li>JavaScript</li>
              <li>SQL</li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold mb-3">
              Frameworks & Tools
            </h5>
            <ul className="space-y-1 leading-relaxed">
              <li>.NET</li>
              <li>Docker</li>
              <li>CI/CD</li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold mb-3">
              Cloud & APIs
            </h5>
            <ul className="space-y-1 leading-relaxed">
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
