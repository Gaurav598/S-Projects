import React from 'react';
import { motion } from 'framer-motion';
import { WifiIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useTranslation } from '../../lib/translations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motionVariants } from '../../lib/motionVariants';

export const WiFiStatus: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.fadeIn}
      className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-sm border shadow-lg ${
        isOnline
          ? 'bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30 shadow-glow-secondary'
          : 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30 animate-pulse'
      }`}
      title={isOnline ? t('online') : t('offline')}
    >
      {isOnline ? (
        <WifiIcon className="h-4 w-4 drop-shadow-sm" />
      ) : (
        <motion.div
          animate={reducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ExclamationTriangleIcon className="h-4 w-4 drop-shadow-sm" />
        </motion.div>
      )}
      <span>{isOnline ? t('online') : t('offline')}</span>
    </motion.div>
  );
};