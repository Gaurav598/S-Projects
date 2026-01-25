import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PaperAirplaneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer, buttonHover } from '../utils/animations';

const Newsletter: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
  };

  const features = [
    {
      icon: '🚨',
      title: 'Emergency Alerts',
      description: 'Get notified about critical disaster updates and emergency protocols'
    },
    {
      icon: '📊',
      title: 'Monthly Reports',
      description: 'Comprehensive disaster management insights and community impact data'
    },
    {
      icon: '🎓',
      title: 'Training Resources',
      description: 'Access exclusive emergency preparedness guides and training materials'
    },
    {
      icon: '🤝',
      title: 'Community Stories',
      description: 'Inspiring stories of resilience and successful disaster response efforts'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12">
            <motion.div
              className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              📬 Stay Connected
            </motion.div>
            
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Emergency Updates &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Insights
              </span>
            </motion.h2>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Subscribe to receive critical emergency updates, disaster management insights, 
              and exclusive resources to help keep your community prepared and protected.
            </motion.p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 mb-16"
          >
            {!isSubscribed ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial="visible"
                animate={isLoading ? "loading" : "visible"}
              >
                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                  <motion.div
                    className="flex-1 relative"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-0"
                      animate={{ opacity: email ? 0.3 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 min-w-[200px] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <PaperAirplaneIcon className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>

                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto"
                  variants={fadeInUp}
                >
                  Join 50,000+ emergency professionals and community leaders. 
                  Unsubscribe at any time. No spam, guaranteed.
                </motion.p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircleIcon className="w-12 h-12 text-green-600 dark:text-green-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to the Community!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You're now subscribed to emergency updates and disaster management insights. 
                  Check your inbox for a welcome email with exclusive resources.
                </p>
                
                <motion.button
                  onClick={() => setIsSubscribed(false)}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Subscribe another email
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-4"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Trusted by 500+ Organizations Worldwide
              </motion.h3>
              
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                {['Emergency Services', 'Fire Departments', 'National Guard', 'Red Cross', 'Local Governments'].map((org, index) => (
                  <motion.div
                    key={org}
                    className="text-sm font-medium bg-white/10 px-4 py-2 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {org}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Background Animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 40%)",
                  "radial-gradient(circle at 80% 50%, white 0%, transparent 40%)",
                  "radial-gradient(circle at 50% 20%, white 0%, transparent 40%)",
                  "radial-gradient(circle at 20% 50%, white 0%, transparent 40%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;