import React from 'react';
import { motion } from 'framer-motion';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { useSettingsStore } from '../../lib/store';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motionVariants } from '../../lib/motionVariants';

export const LanguageToggle: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useSettingsStore();
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  return (
    <motion.button
      variants={variants.floatingButton}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-gray-600 dark:text-gray-300 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg hover:shadow-glow"
      title="Toggle Language"
    >
      <LanguageIcon className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {currentLanguage === 'en' ? 'EN' : 'हि'}
      </span>
    </motion.button>
  );
};