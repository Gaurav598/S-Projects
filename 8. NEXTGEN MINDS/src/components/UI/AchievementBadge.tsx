import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, TrophyIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid';
import { Achievement } from '../../lib/store';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motionVariants } from '../../lib/motionVariants';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap = {
  profile: BriefcaseIcon,
  quiz: AcademicCapIcon,
  career: TrophyIcon,
  learning: StarIcon,
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  size = 'md' 
}) => {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;
  const Icon = iconMap[achievement.category];

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <motion.div
      variants={variants.badgePop}
      initial="hidden"
      animate="visible"
      whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
      className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br from-yellow-400 to-orange-500 
        rounded-full flex items-center justify-center 
        shadow-lg border-2 border-white dark:border-gray-800
        cursor-pointer
      `}
      title={`${achievement.title}: ${achievement.description}`}
    >
      <Icon className={`${iconSizes[size]} text-white`} />
    </motion.div>
  );
};

interface ProgressDisplayProps {
  label: string;
  progress: number;
  total?: number;
  color?: 'primary' | 'secondary' | 'accent';
}

export const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  label,
  progress,
  total = 100,
  color = 'primary'
}) => {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600'
  };

  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {progress}/{total}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={reducedMotion ? { width: `${percentage}%` } : { width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};