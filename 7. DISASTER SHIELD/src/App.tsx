import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Statistics from './components/Statistics';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical images
    const criticalImages = [
      'https://images.pexels.com/photos/1119974/pexels-photo-1119974.jpeg',
      'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg',
      'https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.div 
      className={`min-h-screen ${isDark ? 'dark' : ''} transition-colors duration-300`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        
        <main>
          <Hero />
          <Services />
          <About />
          <Statistics />
          <CaseStudies />
          <Testimonials />
          <Newsletter />
        </main>
        
        <Footer />

        {/* Emergency Floating Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.button
            className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                "0 0 0 10px rgba(239, 68, 68, 0)",
                "0 0 0 0 rgba(239, 68, 68, 0)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚨</span>
              <span className="font-bold text-sm group-hover:text-base transition-all duration-200">
                SOS
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-8 left-8 z-40 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default App;