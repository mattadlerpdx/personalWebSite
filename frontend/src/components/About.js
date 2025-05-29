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
          <h3 className="text-xl sm:text-2xl text-black dark:text-white mb-4">{about.title}</h3>

          <p className="text-base sm:text-lg md:text-xl text-black dark:text-white leading-relaxed max-w-prose mx-auto md:mx-0">
            {about.description}
          </p>
        </div>
      </div>
    </section>
  );
}
