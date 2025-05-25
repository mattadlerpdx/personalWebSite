import React from 'react';
import Projects from '../components/Projects';

export default function ProjectsPage({ darkMode }) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
<Projects darkMode={darkMode} />
    </div>
  );
}
