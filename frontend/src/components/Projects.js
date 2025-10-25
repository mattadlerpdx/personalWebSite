import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Projects() {
  const { darkMode } = useTheme();
const projects = [
  {
    title: "Cadence SCM",
    description:
      "Currently building a predictive supply chain platform (Cadence) for cannabis companies. Features working Firebase for user auth, React frontend hosted on Cloud Run, and backend API for packaging forecasts. MVP in progress – Check it out!",
    link: "https://frontend-service-122826430682.us-west1.run.app/#/",
    isExternal: true,
    pdf: null
  },
  {
    title: "AI Integration – Swedemom",
    description:
      "Integrated OpenAI's Responses API into Swedemom's listing workflow. Automated title generation, shipping dimension estimation, and pricing logic. Benchmarked GPT-4o vs GPT-4.1-mini for speed and token cost.",
    pdf: "/OpenAiReport.pdf",
    link: "/OpenAiReport.pdf",
    isExternal: false
  },
  {
    title: "eBay OAuth Automation – Swedemom",
    description:
      "Built a centralized service to manage sandbox and production eBay API tokens. Replaced manual token refresh with a secure, scalable OAuth handler used across multiple test and deployment environments.",
    pdf: "/eBayTokensApiReport.pdf",
    link: "/eBayTokensApiReport.pdf",
    isExternal: false
  }
];



  return (
    <section
      className={`py-16 px-6 transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'
        }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="grid gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target={project.isExternal ? "_blank" : undefined}
              rel={project.isExternal ? "noopener noreferrer" : undefined}
              download={!project.isExternal ? true : undefined}
              className={`block p-6 border rounded-lg shadow-sm transition-all duration-300 cursor-pointer group ${darkMode
                ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20 active:bg-white/15'
                : 'bg-white text-black border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100'
                } hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]`}
            >
              <h3 className="text-xl font-bold mb-2 pb-1 transition-all duration-300 group-hover:bg-gradient-miami group-hover:bg-200 group-hover:animate-shimmer group-hover:bg-clip-text group-hover:text-transparent">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
              {project.pdf && (
                <span className="inline-block text-sm text-gray-600 dark:text-gray-400">
                  📄 Download Report
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
