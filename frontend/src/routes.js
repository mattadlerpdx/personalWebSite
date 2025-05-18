import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import KaleidoscopeTechStack from './components/KaleidoscopeTechStack';
import Projects from './components/Projects';
import ContactPage from './pages/ContactPage';
import ResumePage from './pages/ResumePage';

// Wrap the home page components to ensure proper cleanup
const HomePage = () => (
  <div className="home-page">
    <Hero />
    <About />
    <KaleidoscopeTechStack />
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes; 