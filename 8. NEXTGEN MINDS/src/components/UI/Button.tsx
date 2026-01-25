import React from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const reducedMotion = useReducedMotion();

  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-2xl
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 hover:from-primary-700 hover:via-primary-600 hover:to-primary-700
      bg-size-200 hover:bg-pos-100 animate-gradient-shift
      text-white 
      focus:ring-primary-500
      shadow-2xl hover:shadow-glow
      border border-primary-400/30
    `,
    secondary: `
      bg-gradient-to-r from-secondary-600 via-secondary-500 to-secondary-600 hover:from-secondary-700 hover:via-secondary-600 hover:to-secondary-700
      text-white 
      focus:ring-secondary-500
      shadow-2xl hover:shadow-glow-secondary
      border border-secondary-400/30
    `,
    accent: `
      bg-gradient-to-r from-accent-600 via-accent-500 to-accent-600 hover:from-accent-700 hover:via-accent-600 hover:to-accent-700
      text-white 
      focus:ring-accent-500
      shadow-2xl hover:shadow-glow-accent
      border border-accent-400/30
    `,
    outline: `
      border-2 border-primary-500/50 backdrop-blur-sm
      bg-white/5 dark:bg-black/5
      text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white hover:border-primary-600
      focus:ring-primary-500
      shadow-lg hover:shadow-glow
    `,
    ghost: `
      text-primary-600 dark:text-primary-400 hover:bg-primary-100/80 dark:hover:bg-primary-900/30
      backdrop-blur-sm
      focus:ring-primary-500
      hover:shadow-lg
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={reducedMotion || isDisabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={reducedMotion || isDisabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};