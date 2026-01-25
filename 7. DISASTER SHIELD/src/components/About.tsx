import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  CheckCircleIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Established with a mission to revolutionize disaster response through technology.',
      icon: LightBulbIcon,
      stats: '5 Team Members'
    },
    {
      year: '2021',
      title: 'First Deployment',
      description: 'Successfully deployed our system during Hurricane Maya, saving 1,200+ lives.',
      icon: ShieldCheckIcon,
      stats: '1.2K Lives Saved'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded operations to 15 countries with localized emergency response systems.',
      icon: GlobeAltIcon,
      stats: '15 Countries'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Integrated advanced AI for predictive disaster modeling and resource optimization.',
      icon: ChartBarIcon,
      stats: '95% Accuracy'
    },
    {
      year: '2024',
      title: 'Community Network',
      description: 'Built a network of 50,000+ trained volunteers and 500+ partner organizations.',
      icon: UserGroupIcon,
      stats: '50K+ Volunteers'
    }
  ];

  const achievements = [
    {
      number: '50,000+',
      label: 'Lives Protected',
      icon: '🛡️',
      description: 'Through our comprehensive emergency response system'
    },
    {
      number: '500+',
      label: 'Partner Organizations',
      icon: '🤝',
      description: 'Working together for community safety'
    },
    {
      number: '15',
      label: 'Countries Served',
      icon: '🌍',
      description: 'Global network of emergency response systems'
    },
    {
      number: '24/7',
      label: 'Response Time',
      icon: '⚡',
      description: 'Round-the-clock emergency monitoring'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
          >
            📖 Our Story
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Building Resilient
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Communities
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            We're dedicated to transforming disaster management through innovative technology, 
            community engagement, and data-driven solutions that save lives and protect communities worldwide.
          </motion.p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              variants={fadeInUp}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHover}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full"
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {achievement.icon}
                </motion.div>
                
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                >
                  {achievement.number}
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {achievement.label}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
          >
            Our Journey Through Time
          </motion.h3>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-600 rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ top: '2rem', bottom: '2rem' }}
            />

            {/* Timeline Items */}
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center z-10`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: index * 0.3, type: "spring", stiffness: 200 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`ml-32 md:ml-0 ${
                      index % 2 === 0 
                        ? 'md:mr-auto md:pr-16 md:w-5/12' 
                        : 'md:ml-auto md:pl-16 md:w-5/12'
                    }`}
                    whileHover={{ scale: 1.02, x: index % 2 === 0 ? 10 : -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {item.year}
                        </motion.div>
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          {item.stats}
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h3
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Our Mission
              </motion.h3>
              <motion.p
                variants={fadeInUp}
                className="text-xl leading-relaxed mb-8 opacity-90"
              >
                To create a world where every community has access to intelligent, 
                rapid-response disaster management systems that minimize loss of life 
                and accelerate recovery through technology and human cooperation.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="space-y-4"
              >
                {[
                  'Advanced early warning systems',
                  'Community-driven response networks',
                  'AI-powered resource optimization',
                  'Real-time coordination platforms'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    variants={fadeInUp}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">2024</div>
                  <div className="text-xl mb-6">Years of Innovation</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="font-bold text-lg">500+</div>
                      <div className="opacity-80">Partners</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <div className="font-bold text-lg">15</div>
                      <div className="opacity-80">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, white 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
                "radial-gradient(circle at 40% 70%, white 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, white 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;