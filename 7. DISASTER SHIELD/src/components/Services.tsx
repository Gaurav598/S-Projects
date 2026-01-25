import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ShieldExclamationIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
  HeartIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations';

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: ShieldExclamationIcon,
      title: 'Emergency Services',
      description: 'Immediate response coordination with local emergency teams, hospitals, and rescue services.',
      features: ['24/7 Dispatch', 'Multi-Agency Coordination', 'Real-time Tracking'],
      color: 'red',
      delay: 0
    },
    {
      icon: MapPinIcon,
      title: 'Resource Locator',
      description: 'AI-powered system to locate nearest shelters, hospitals, supplies, and safe zones.',
      features: ['Smart Mapping', 'Real-time Availability', 'Route Optimization'],
      color: 'blue',
      delay: 0.1
    },
    {
      icon: PhoneIcon,
      title: 'SOS System',
      description: 'One-touch emergency alert system with GPS tracking and automatic notifications.',
      features: ['GPS Location', 'Auto Notifications', 'Emergency Contacts'],
      color: 'green',
      delay: 0.2
    },
    {
      icon: UsersIcon,
      title: 'Volunteer Portal',
      description: 'Connect with trained volunteers and coordinate community disaster response efforts.',
      features: ['Skill Matching', 'Training Programs', 'Task Management'],
      color: 'purple',
      delay: 0.3
    },
    {
      icon: HeartIcon,
      title: 'Donation Hub',
      description: 'Secure platform for collecting and distributing donations during disaster relief.',
      features: ['Secure Payments', 'Impact Tracking', 'Transparency Reports'],
      color: 'pink',
      delay: 0.4
    },
    {
      icon: MegaphoneIcon,
      title: 'Live Updates',
      description: 'Real-time disaster information, weather alerts, and safety instructions.',
      features: ['Weather Integration', 'Alert System', 'Multi-language Support'],
      color: 'yellow',
      delay: 0.5
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Communication Hub',
      description: 'Secure messaging system for families to stay connected during emergencies.',
      features: ['Family Groups', 'Offline Messages', 'Status Updates'],
      color: 'indigo',
      delay: 0.6
    },
    {
      icon: ClockIcon,
      title: 'Recovery Assistance',
      description: 'Post-disaster support including insurance help, rebuilding resources, and counseling.',
      features: ['Insurance Claims', 'Mental Health Support', 'Rebuilding Resources'],
      color: 'teal',
      delay: 0.7
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
          >
            🛡️ Comprehensive Protection Services
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Emergency Response
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Solutions
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Our comprehensive disaster management platform provides end-to-end solutions for emergency 
            preparedness, response coordination, and community recovery efforts.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              custom={service.delay}
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={cardHover}
                className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full hover:border-${service.color}-200 dark:hover:border-${service.color}-800 transition-all duration-300`}
              >
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 bg-gradient-to-br from-${service.color}-100 to-${service.color}-200 dark:from-${service.color}-900/50 dark:to-${service.color}-800/50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 10 }}
                >
                  <service.icon className={`w-8 h-8 text-${service.color}-600 dark:text-${service.color}-400`} />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: service.delay + (idx * 0.1) }}
                      >
                        <motion.div
                          className={`w-2 h-2 bg-${service.color}-500 rounded-full mr-3 flex-shrink-0`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className={`w-full mt-6 bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 text-white py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Access Service
                  </motion.button>
                </div>

                {/* Hover Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-${service.color}-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Demo Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10 text-center">
            <motion.h3
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Experience Our Platform
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            >
              See how our integrated disaster management system can protect your community 
              with real-time response coordination and intelligent resource allocation.
            </motion.p>
            <motion.button
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Interactive Demo
            </motion.button>
          </div>

          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
                "radial-gradient(circle at 40% 30%, white 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;