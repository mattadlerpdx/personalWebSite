import React from 'react';
import KaleidoscopeTechStack from './KaleidoscopeTechStack';

export default function Skills({ darkMode }) {
  return (
    <div className="max-w-4xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-black dark:text-white">
        Skills
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-black dark:text-white leading-relaxed mb-12 text-center">
        With a foundation in systems programming and real-world experience building a CGO WebSocket library at BlackBerry,
        I’ve since expanded into full-stack development—modernizing .NET platforms, building cloud-native services,
        and integrating AI tools like OpenAI’s API. I'm especially passionate about natural language processing,
        large language models, and scalable, AI-driven architectures.
      </p>
      <div className="grid sm:grid-cols-3 gap-10 text-left text-black dark:text-white mt-16 text-center">
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
  );
}
