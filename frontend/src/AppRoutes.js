// AppRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Projects from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';



const AppRoutes = ({ darkMode, triggerRef}) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage darkMode={darkMode} triggerRef={triggerRef} />} />
      <Route path="/projects" element={<Projects darkMode={darkMode} />} />
      <Route path="/about" element={<AboutPage darkMode={darkMode} />} />
      <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
