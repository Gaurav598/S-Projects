import React from 'react';
import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  ChartBarIcon,
  UserGroupIcon,
  BookOpenIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const Features = () => {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths that adapt to your pace and learning style using advanced AI algorithms.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Analytics',
      description: 'Detailed insights into your learning journey with comprehensive analytics and progress tracking.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: UserGroupIcon,
      title: 'Community Learning',
      description: 'Connect with fellow learners, join study groups, and collaborate on projects in our vibrant community.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BookOpenIcon,
      title: 'Extensive Library',
      description: 'Access thousands of courses across technology, business, creative arts, and personal development.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: LightBulbIcon,
      title: 'Interactive Challenges',
      description: 'Hands-on coding challenges, quizzes, and projects to reinforce your learning and build portfolio.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Certified Learning',
      description: 'Earn industry-recognized certificates upon course completion to boost your career prospects.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              LearnTech
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of learning with our cutting-edge platform designed to help you achieve your goals faster and more effectively.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <motion.div
                  className="mt-6 flex items-center text-primary-600 dark:text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;