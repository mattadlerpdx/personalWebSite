// AppRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import KaleidoscopeTechStack from './components/KaleidoscopeTechStack';
import Projects from './components/Projects';
import ContactPage from './pages/ContactPage';
import ResumePage from './pages/ResumePage';

const HomePage = ({ darkMode }) => (
  <div className="home-page">
    <Hero />
    <About />
    <KaleidoscopeTechStack darkMode={darkMode} /> {/* ✅ pass darkMode here */}
  </div>
);

const AppRoutes = ({ darkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage darkMode={darkMode} />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
