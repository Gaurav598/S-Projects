import React from 'react';
import { motion } from 'framer-motion';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  whileInView?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  clickable = false,
  onClick,
  whileInView = false,
  glass = false
}) => {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const baseClasses = `
    ${glass 
      ? 'bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass dark:shadow-glass-dark' 
      : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/50'
    }
    rounded-3xl 
    shadow-2xl hover:shadow-glow dark:hover:shadow-glow
    transition-all duration-500 ease-out
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none
    ${clickable ? 'cursor-pointer' : ''}
    ${className}
  `;

  const motionProps = {
    ...(whileInView && {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-50px" },
      variants: variants.slideUp
    }),
    ...(hoverable && !reducedMotion && {
      variants: variants.cardHover,
      initial: "rest",
      whileHover: "hover",
      transition: { duration: 0.5, ease: "easeOut" }
    }),
    ...(clickable && {
      onClick,
      whileTap: reducedMotion ? {} : { scale: 0.95, transition: { duration: 0.1 } }
    })
  };

  return (
    <motion.div
      className={baseClasses}
      {...motionProps}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};