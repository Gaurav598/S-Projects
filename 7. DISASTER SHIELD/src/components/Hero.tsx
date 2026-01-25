import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, PhoneIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer, buttonHover } from '../utils/animations';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const heroStats = [
    { number: '50K+', label: 'Lives Saved', icon: HeartIcon },
    { number: '24/7', label: 'Response Time', icon: PhoneIcon },
    { number: '500+', label: 'Locations', icon: MapPinIcon },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"
      />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              variants={fadeInUp}
              className="space-y-6"
            >
              <motion.div
                className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                🚨 Emergency Response System Active
              </motion.div>
              
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  variants={fadeInUp}
                >
                  <span className="text-gray-900 dark:text-white">Protect</span>{' '}
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundSize: '400% 400%',
                    }}
                  >
                    Communities
                  </motion.span>
                  <br />
                  <span className="text-gray-900 dark:text-white">Save Lives</span>
                </motion.h1>
                
                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
                >
                  Advanced disaster management platform connecting emergency services, 
                  resources, and communities through intelligent response systems.
                </motion.p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get Emergency Help</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                className="group bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex items-center justify-center space-x-2"
              >
                <span>Learn More</span>
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Interactive Visual */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Dashboard Visual */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Emergency Dashboard
                    </h3>
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Active Alerts', value: '12', color: 'red' },
                      { label: 'Teams Deployed', value: '8', color: 'blue' },
                      { label: 'Safe Locations', value: '45', color: 'green' },
                      { label: 'Response Time', value: '3.2m', color: 'yellow' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-2xl font-bold text-${item.color}-500 mb-1`}>
                          {item.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Progress Bars */}
                  <div className="space-y-3">
                    {[
                      { label: 'System Status', progress: 95, color: 'green' },
                      { label: 'Resource Availability', progress: 78, color: 'blue' },
                      { label: 'Response Coverage', progress: 88, color: 'yellow' },
                    ].map((item, index) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.label}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                            className={`h-2 bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 2, delay: index * 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-2xl shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-sm font-medium">Emergency Alert</div>
                <div className="text-2xl font-bold">ACTIVE</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-sm font-medium">Response Teams</div>
                <div className="text-2xl font-bold">READY</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto">
          <motion.path
            d="M0,20 C320,80 420,20 640,50 C860,80 1120,20 1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
            className="text-white dark:text-gray-900"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;