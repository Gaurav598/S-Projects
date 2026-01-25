import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { useChatStore } from '../../lib/store';
import { sendMessageToBot, handleQuickAction } from '../../lib/chat';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Button } from '../UI/Button';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const quickActions = [
  { label: 'Show Roadmap', icon: SparklesIcon },
  { label: 'Scholarships', icon: AcademicCapIcon },
  { label: 'Export Plan', icon: ArrowDownTrayIcon },
  { label: 'Resources', icon: BookOpenIcon }
];

export const ChatWindow: React.FC = () => {
  const { messages, isOpen, addMessage } = useChatStore();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      // Add welcome message when chat is first opened
      addMessage({
        content: "Hi! I'm your NextGen Minds assistant. I can help you with career recommendations, roadmaps, scholarships, and answer questions about your career journey. How can I assist you today?",
        sender: 'bot',
        actions: quickActions.map(action => action.label)
      });
    }
  }, [isOpen, messages.length, addMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addMessage({
      content: userMessage,
      sender: 'user'
    });

    setIsTyping(true);

    try {
      // Get bot response
      const response = await sendMessageToBot(userMessage);
      
      // Add bot response
      addMessage({
        content: response,
        sender: 'bot',
        actions: Math.random() > 0.7 ? quickActions.map(action => action.label).slice(0, 2) : undefined
      });
    } catch (error) {
      addMessage({
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'bot'
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickActionClick = async (action: string) => {
    addMessage({
      content: action,
      sender: 'user'
    });

    setIsTyping(true);
    try {
      const response = await handleQuickAction(action);
      addMessage({
        content: response,
        sender: 'bot'
      });
    } catch (error) {
      addMessage({
        content: "I couldn't process that action right now. Please try again.",
        sender: 'bot'
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-40 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-secondary-600">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">NextGen Minds</h3>
                <p className="text-xs text-primary-100">AI Assistant</p>
              </div>
              <motion.div
                animate={reducedMotion ? {} : { scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-auto w-2 h-2 bg-green-400 rounded-full"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={variants.chatMessage}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    
                    {/* Quick Action Buttons */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.actions.map((action) => {
                          const ActionIcon = quickActions.find(qa => qa.label === action)?.icon || SparklesIcon;
                          return (
                            <motion.button
                              key={action}
                              whileHover={reducedMotion ? {} : { scale: 1.05 }}
                              whileTap={reducedMotion ? {} : { scale: 0.95 }}
                              onClick={() => handleQuickActionClick(action)}
                              className="flex items-center space-x-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs transition-colors"
                            >
                              <ActionIcon className="h-3 w-3" />
                              <span>{action}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants.chatMessage}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                  <div className="flex items-center space-x-1">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                      Thinking...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers, roadmaps, scholarships..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                disabled={isTyping}
              />
              <motion.button
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};