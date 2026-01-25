import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  BriefcaseIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from '../../lib/translations';
import { useAppStore } from '../../lib/store';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { WiFiStatus } from '../UI/WiFiStatus';
import { LanguageToggle } from '../UI/LanguageToggle';
import { VoiceButton } from '../UI/VoiceButton';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { setQRCode } = useAppStore();
  const reducedMotion = useReducedMotion();
  
  const variants = reducedMotion ? {} : motionVariants;

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('profile'), path: '/profile' },
    { name: t('quiz'), path: '/quiz' },
    { name: t('recommendations'), path: '/recommendations' },
    { name: t('resources'), path: '/resources' },
    { name: t('settings'), path: '/settings' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  const handleQRShare = () => {
    const currentUrl = window.location.href;
    setQRCode(true, currentUrl);
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={variants.fadeIn}
      className="bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 sticky top-0 z-50 shadow-glass dark:shadow-glass-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={reducedMotion ? {} : { scale: 1.05, rotate: 1 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <BriefcaseIcon className="h-8 w-8 text-primary-600 dark:text-primary-400 drop-shadow-lg" />
                <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg animate-pulse-glow"></div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                NextGen Minds
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation & Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={reducedMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={reducedMotion ? {} : { scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-700 dark:text-primary-300 shadow-inner-glow backdrop-blur-sm border border-primary-500/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/20 dark:hover:bg-black/20 backdrop-blur-sm'
                    }`}
                  >
                    {isActive(item.path) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 animate-shimmer"></div>
                    )}
                    <span className="relative z-10">
                    {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-3 pl-4 border-l border-white/20 dark:border-white/10">
              <VoiceButton />
              <LanguageToggle />
              <motion.button
                whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                whileTap={reducedMotion ? {} : { scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={handleQRShare}
                className="p-2.5 rounded-xl bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-gray-600 dark:text-gray-300 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg hover:shadow-glow"
                title={t('shareQR')}
              >
                <QrCodeIcon className="h-4 w-4" />
              </motion.button>
              <WiFiStatus />
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={reducedMotion ? {} : { scale: 0.9, rotate: 5 }}
            transition={{ duration: 0.1 }}
            onClick={toggleMenu}
            className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 shadow-glass dark:shadow-glass-dark"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.name}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 backdrop-blur-sm ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-700 dark:text-primary-300 border border-primary-500/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/20 dark:hover:bg-black/20'
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Mobile Controls */}
              <div className="pt-4 mt-4 border-t border-white/20 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <VoiceButton />
                    <LanguageToggle />
                    <motion.button
                      whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                      whileTap={reducedMotion ? {} : { scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      onClick={handleQRShare}
                      className="p-2.5 rounded-xl bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-gray-600 dark:text-gray-300 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10"
                      title={t('shareQR')}
                    >
                      <QrCodeIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                  <WiFiStatus />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};