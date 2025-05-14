import React from 'react';
import { getResumeUrl } from '../api';

function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resume</h1>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-lg mb-6">
          You can download my resume by clicking the button below:
        </p>
        <a
          href={getResumeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default ResumePage; 