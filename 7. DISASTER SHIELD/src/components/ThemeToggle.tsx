import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative p-3 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-6 h-6"
      >
        {isDark ? (
          <MoonIcon className="w-6 h-6 text-blue-400" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;