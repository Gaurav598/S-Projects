import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Chatbot } from './components/Chatbot/Chatbot';
import { Home } from './components/Pages/Home';
import { ProfileBuilder } from './components/Pages/ProfileBuilder';
import { Quiz } from './components/Pages/Quiz';
import { Recommendations } from './components/Pages/Recommendations';
import { Settings } from './components/Pages/Settings';
import { useTheme } from './hooks/useTheme';
import { useSettingsStore, useProgressStore } from './lib/store';
import { initDB } from './lib/database';
import { QRCodeModal } from './components/UI/QRCodeModal';

// Placeholder components for routes not yet implemented
const Resources: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Learning Resources
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Coming soon! This section will contain curated learning materials, courses, and tools for your career development.
        </p>
      </div>
    </div>
  </div>
);

const CareerDetail: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Career Detail & Roadmap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Detailed career roadmap with interactive timeline coming soon!
        </p>
      </div>
    </div>
  </div>
);

function App() {
  const { settings } = useSettingsStore();
  const { addAchievement } = useProgressStore();
  useTheme(); // Initialize theme

  useEffect(() => {
    // Initialize IndexedDB
    initDB();

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  useEffect(() => {
    // Apply reduced motion preference globally
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--motion-preference', 'reduce');
    } else {
      document.documentElement.style.removeProperty('--motion-preference');
    }
  }, [settings.reducedMotion]);

  // Add welcome achievement on first visit
  useEffect(() => {
    const hasWelcomeAchievement = localStorage.getItem('welcome-achievement');
    if (!hasWelcomeAchievement) {
      addAchievement({
        id: 'welcome',
        title: 'Welcome to NextGen Minds!',
        description: 'Started your career discovery journey',
        icon: '🎉',
        category: 'profile'
      });
      localStorage.setItem('welcome-achievement', 'true');
    }
  }, [addAchievement]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfileBuilder />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/career/:id" element={<CareerDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <Footer />
        <Chatbot />
        <QRCodeModal />
      </div>
    </Router>
  );
}

export default App;