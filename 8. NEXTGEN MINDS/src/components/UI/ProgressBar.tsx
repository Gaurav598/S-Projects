import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
  className = '',
  color = 'primary'
}) => {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const colorClasses = {
    primary: 'bg-primary-600 dark:bg-primary-500',
    secondary: 'bg-secondary-600 dark:bg-secondary-500',
    accent: 'bg-accent-600 dark:bg-accent-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClasses[color]}`}
          initial={reducedMotion ? { width: `${progress}%` } : { width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};