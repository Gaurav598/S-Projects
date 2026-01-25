import React from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { useVoice, useVoiceCommands } from '../../hooks/useVoice';
import { useTranslation } from '../../lib/translations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motionVariants } from '../../lib/motionVariants';

interface VoiceButtonProps {
  onCommand?: (command: string) => void;
  className?: string;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onCommand, className = '' }) => {
  const { isListening, startListening, stopListening, isSupported } = useVoice();
  const { processCommand } = useVoiceCommands();
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <motion.button
      variants={variants.floatingButton}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className={`
        relative p-3 rounded-2xl transition-all duration-300 backdrop-blur-sm border shadow-lg
        ${isListening 
          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-glow border-red-400/30 animate-pulse-glow' 
          : 'bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-gray-600 dark:text-gray-300 border-white/20 dark:border-white/10'
        }
        ${className}
      `}
      title={isListening ? t('listening') : t('voiceCommands')}
    >
      <MicrophoneIcon className="h-5 w-5" />
      
      {isListening && (
        <motion.div
          animate={reducedMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-red-400/30 blur-sm"
        />
      )}
    </motion.button>
  );
};