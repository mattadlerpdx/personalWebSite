import React from 'react';

export default function Skills({ darkMode }) {
  return (
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
  );
}
