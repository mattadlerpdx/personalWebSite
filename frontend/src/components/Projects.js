import React from 'react';

export default function Projects({ darkMode }) {
const projects = [
  {
    title: "Cadence SCM",
    description: (
      <>
        Currently building a predictive supply chain platform (Cadence) for cannabis companies. Features working Firebase for user auth, React frontend hosted on Cloud Run, and backend API for packaging forecasts. MVP in progress –{" "}
        <a
          href="https://frontend-service-122826430682.us-west1.run.app/#/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Check it out!
        </a>
        .
      </>
    ),
    pdf: null
  },
  {
    title: "AI Integration – Swedemom",
    description:
      "Integrated OpenAI’s Responses API into Swedemom’s listing workflow. Automated title generation, shipping dimension estimation, and pricing logic. Benchmarked GPT-4o vs GPT-4.1-mini for speed and token cost.",
    pdf: "/OpenAiReport.pdf"
  },
  {
    title: "eBay OAuth Automation – Swedemom",
    description:
      "Built a centralized service to manage sandbox and production eBay API tokens. Replaced manual token refresh with a secure, scalable OAuth handler used across multiple test and deployment environments.",
    pdf: "/eBayTokensApiReport.pdf"
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
            <div
              key={i}
              className={`p-6 border rounded-lg shadow-sm transition-colors duration-300 ${darkMode
                ? 'bg-white/5 text-white border-white/10'
                : 'bg-white text-black border-gray-200'
                }`}
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
              {project.pdf && (
                <a
                  href={project.pdf}
                  download
                  className="inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  📄 Download Report
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
