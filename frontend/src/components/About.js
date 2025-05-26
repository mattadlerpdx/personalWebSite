import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../api';

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then((data) => setAbout(data))
      .catch((err) => console.error('Failed to fetch about info:', err));
  }, []);

  if (!about) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;

  return (
    <section className="w-full px-4 mb-16 transition-colors duration-300">
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
          <h2 className="text-3xl font-bold mb-1">{about.name}</h2>
          <h3 className="text-xl text-blue-400 dark:text-blue-300 mb-4">{about.title}</h3>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg max-w-prose mx-auto md:mx-0 mb-6">
            {about.description}
          </p>

          {/* Skills Section */}
          <div className="mt-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <h4 className="text-lg font-semibold mb-4 text-center sm:text-left">Skills</h4>
            <div className="grid sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <h5 className="font-medium mb-2">Languages</h5>
                <p className="leading-relaxed">
                  Go<br />
                  C#<br />
                  JavaScript<br />
                  SQL
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Frameworks & Tools</h5>
                <p className="leading-relaxed">
                  React.js<br />
                  Docker<br />
                  CI/CD
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Cloud & APIs</h5>
                <p className="leading-relaxed">
                  Google Cloud<br />
                  OpenAI API<br />
                  GitHub/GitLab
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
