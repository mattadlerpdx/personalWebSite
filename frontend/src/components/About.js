import React from 'react';

export default function About() {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-20 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-md p-10 flex flex-col md:flex-row items-center gap-10">
        
        {/* 👤 Profile Image Placeholder */}
        <div className="flex-shrink-0">
          <img
            src="images/linkinphoto.jpg" 
            alt="Matt Profile"
            className="w-40 h-40 rounded-full shadow-lg object-cover"
          />
        </div>

        {/* 📄 Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
            I'm Matt — a systems-focused software engineer with a master's in CS.
            I enjoy building clean, scalable tools that merge backend logic with frontend experience.
            My focus is on clarity, automation, and beautiful workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
