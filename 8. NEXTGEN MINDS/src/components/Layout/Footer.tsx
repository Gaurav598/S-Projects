import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Footer: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants.slideUp}
      className="relative bg-gradient-to-br from-gray-50/80 via-primary-50/30 to-secondary-50/30 dark:from-gray-900/80 dark:via-primary-950/30 dark:to-secondary-950/30 backdrop-blur-sm border-t border-white/20 dark:border-white/10 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-radial from-primary-500/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-radial from-secondary-500/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10">
          <motion.div
            whileHover={reducedMotion ? {} : { scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              NextGen Minds
            </span>
          </motion.div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
            Discover your perfect career path with AI-powered recommendations, 
            personalized roadmaps, and comprehensive resources.
          </p>
          
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <motion.div
              animate={reducedMotion ? {} : { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeartIcon className="h-4 w-4 text-red-500 drop-shadow-lg" />
            </motion.div>
            <span>for your career journey</span>
          </div>
          
          <div className="mt-6 text-xs text-gray-400 dark:text-gray-500 font-medium">
            © 2025 NextGen Minds. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};