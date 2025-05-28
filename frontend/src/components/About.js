import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../api';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';

export default function About({ darkMode }) {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then((data) => setAbout(data))
      .catch((err) => console.error('Failed to fetch about info:', err));
  }, []);

  if (!about) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;

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
          <h2 className="text-3xl sm:text-4xl font-bold mb-1 text-gray-800 dark:text-gray-100">{about.name}</h2>
          <h3 className="text-xl sm:text-2xl dark:text-white light:text-black mb-4">{about.title}</h3>

          <p className="text-base sm:text-lg md:text-xl dark:text-white light:text-black dark:text-white light:text-black leading-relaxed max-w-prose mx-auto md:mx-0">
            {about.description}
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-6xl mx-auto pt-24 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center dark:text-white light:text-black">
          Skills
        </h2>

        <p className="text-base sm:text-lg md:text-xl dark:text-white light:text-black leading-relaxed mb-12 max-w-4xl mx-auto text-center">
          With a foundation in systems programming and real-world experience building a CGO WebSocket library at BlackBerry,
          I’ve since expanded into full-stack development—modernizing .NET platforms, building cloud-native services,
          and integrating AI tools like OpenAI’s API. I'm especially passionate about natural language processing,
          large language models, and scalable, AI-driven architectures.
        </p>

        <KaleidoscopeTechStack darkMode={darkMode} />

        <div className="grid sm:grid-cols-3 gap-10 text-center dark:text-white light:text-black mt-24 sm:mt-32 max-w-5xl mx-auto">
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
            <h5 className="text-lg sm:text-xl font-semibold mb-3">Frameworks & Tools</h5>
            <ul className="space-y-1 leading-relaxed">
              <li>React.js</li>
              <li>Docker</li>
              <li>CI/CD</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg sm:text-xl font-semibold mb-3">Cloud & APIs</h5>
            <ul className="space-y-1 leading-relaxed">
              <li>Google Cloud</li>
              <li>OpenAI API</li>
              <li>GitHub / GitLab</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
