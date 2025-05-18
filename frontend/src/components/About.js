import React, { useEffect, useState } from 'react';

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/about')
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error('Failed to fetch about info:', err));
  }, []);

  if (!about) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-md p-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <img
            src="images/linkinphoto.jpg"
            alt="Matt Profile"
            className="w-40 h-40 rounded-full shadow-lg object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">{about.name}</h2>
          <h3 className="text-2xl mb-2">{about.title}</h3>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
            {about.description}
          </p>
          <ul className="mt-4 text-gray-700 dark:text-gray-300">
            {about.skills.map((skill, index) => (
              <li key={index}>• {skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
