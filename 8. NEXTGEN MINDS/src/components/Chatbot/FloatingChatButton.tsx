import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useChatStore } from '../../lib/store';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const FloatingChatButton: React.FC = () => {
  const { isOpen, toggleChat } = useChatStore();
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  return (
    <motion.div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        <motion.button
          onClick={toggleChat}
          variants={variants.floatingButton}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XMarkIcon className="h-7 w-7" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <ChatBubbleLeftRightIcon className="h-7 w-7" />
                {/* Notification dot */}
                <motion.div
                  animate={reducedMotion ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};