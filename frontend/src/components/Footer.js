import React from 'react';
import { Link } from 'react-router-dom';
import { getResumeUrl } from '../api';

export default function Footer() {
  return (
    <footer className="text-center py-10 mt-20">
      <div className="flex justify-center space-x-8 text-base font-medium text-gray-600 dark:text-gray-300">
        <Link to="/projects" className="hover:text-black dark:hover:text-white transition">
          Projects
        </Link>
        <a
          href={getResumeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition"
        >
          Resume
        </a>
        <Link to="/contact" className="hover:text-black dark:hover:text-white transition">
          Contact
        </Link>
      </div>

      <div className="mt-10 flex justify-center items-center gap-2">
        <img
          src="/logoB.svg"
          alt="Site Logo"
          className="w-5 h-5 rounded-sm"
        />
        <p className="text-sm text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Matt Adler. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
