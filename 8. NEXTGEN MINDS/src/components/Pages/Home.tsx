import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  CloudIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { useTranslation } from '../../lib/translations';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const steps = [
    {
      number: 1,
      title: 'Build Your Profile',
      description: 'Tell us about your interests, skills, and career goals',
      icon: SparklesIcon
    },
    {
      number: 2,
      title: 'Take the Assessment',
      description: 'Complete our comprehensive career personality quiz',
      icon: ChartBarIcon
    },
    {
      number: 3,
      title: 'Get Recommendations',
      description: 'Receive personalized career paths with detailed roadmaps',
      icon: AcademicCapIcon
    }
  ];

  const features = [
    {
      title: 'Offline Ready',
      description: 'Works without internet connection using local storage',
      icon: CloudIcon
    },
    {
      title: 'Multilingual Support',
      description: 'Available in English and Hindi for accessibility',
      icon: GlobeAltIcon
    },
    {
      title: 'Voice Integration',
      description: 'Speech recognition for hands-free interaction',
      icon: MicrophoneIcon
    },
    {
      title: 'Privacy First',
      description: 'Your data stays secure and private on your device',
      icon: ShieldCheckIcon
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.pageTransition}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-primary-950 dark:to-secondary-950" />
      <div className="fixed inset-0 bg-hero-pattern opacity-30" />
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-primary-500/5 to-secondary-500/5 animate-gradient-shift" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600/90 via-primary-700/90 to-primary-800/90 dark:from-primary-800/90 dark:via-primary-900/90 dark:to-gray-900/90 backdrop-blur-sm overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-secondary-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-accent-500/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants.staggerContainer}
              className="text-white"
            >
              <motion.h1
                variants={variants.staggerItem}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              >
                {t('heroTitle').split(' ').slice(0, 2).join(' ')}{' '}
                <span className="bg-gradient-to-r from-accent-300 via-secondary-300 to-accent-300 bg-clip-text text-transparent animate-gradient-shift bg-size-200">
                  {t('heroTitle').split(' ').slice(2).join(' ')}
                </span>
              </motion.h1>
              
              <motion.p
                variants={variants.staggerItem}
                className="text-xl md:text-2xl mb-10 text-primary-100/90 leading-relaxed backdrop-blur-sm"
              >
                {t('heroSubtitle')}
              </motion.p>
              
              <motion.div
                variants={variants.staggerItem}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/profile">
                  <Button size="lg" variant="accent" className="group shadow-2xl hover:shadow-glow-accent">
                    {t('getStarted')}
                  </Button>
                </Link>
                
                <Link to="/quiz">
                  <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm">
                    {t('takeQuiz')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants.slideInFromRight}
              className="hidden lg:block relative"
            >
              <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10">
                <svg
                  viewBox="0 0 500 400"
                  className="w-full h-auto max-w-md mx-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Career Path Illustration */}
                  <motion.path
                    d="M50 350 Q 200 100 450 50"
                    stroke="url(#gradient1)" 
                    strokeWidth="8"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    filter="drop-shadow(0 0 10px rgba(20, 184, 166, 0.5))"
                  />
                  
                  {/* Career Milestones */}
                  {[
                    { x: 80, y: 320 },
                    { x: 200, y: 200 },
                    { x: 350, y: 120 },
                    { x: 430, y: 70 }
                  ].map((point, index) => (
                    <motion.circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="12"
                      fill="url(#glowGradient)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.4, duration: 0.6, type: "spring" }}
                      filter="drop-shadow(0 0 8px rgba(249, 115, 22, 0.8))"
                    />
                  ))}

                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 bg-gradient-to-br from-white/80 via-primary-50/50 to-secondary-50/50 dark:from-gray-900/80 dark:via-primary-950/50 dark:to-secondary-950/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              {t('howItWorks')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our simple 3-step process helps you discover and plan your ideal career path
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={variants.staggerItem}
                  whileHover={reducedMotion ? {} : { y: -12, scale: 1.02 }}
                  className="relative"
                >
                  <Card glass className="p-10 text-center h-full group">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-glow transition-all duration-500 animate-float">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                  
                  {/* Connecting Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRightIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 bg-gradient-to-br from-secondary-50/50 via-white/80 to-accent-50/50 dark:from-secondary-950/50 dark:via-gray-900/80 dark:to-accent-950/50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent animate-shimmer"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              {t('powerfulFeatures')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced capabilities designed to provide you with the best career guidance experience
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants.staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={variants.staggerItem}
                  whileHover={reducedMotion ? {} : { scale: 1.08, y: -8 }}
                  className="group"
                >
                  <Card glass className="p-8 text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl group-hover:shadow-glow animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary-600/90 via-secondary-600/90 to-accent-600/90 dark:from-primary-800/90 dark:via-secondary-800/90 dark:to-accent-800/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Ready to Discover Your Perfect Career?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals who have found their dream careers with our AI-powered guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile">
                <Button size="lg" variant="accent" className="px-10 shadow-2xl hover:shadow-glow-accent">
                  Start Your Journey
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/recommendations">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/20 px-10 backdrop-blur-sm border border-white/20">
                  Explore Careers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};