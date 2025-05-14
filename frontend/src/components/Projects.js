import React from 'react';
import projects from '../data/projects';

export default function Projects() {
  return (
    <section className="bg-gray-100 dark:bg-neutral-900 text-black dark:text-white py-16 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="grid gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 dark:border-white/10 rounded-lg shadow-sm bg-white dark:bg-white/5 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
