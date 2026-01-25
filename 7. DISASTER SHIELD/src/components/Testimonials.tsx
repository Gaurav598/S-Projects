import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations';

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Martinez',
      role: 'Emergency Management Director',
      organization: 'Florida Emergency Services',
      location: 'Miami, FL',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
      rating: 5,
      quote: "DisasterShield has revolutionized how we handle emergency responses. The AI-powered coordination system helped us save over 1,200 lives during Hurricane Maya. The real-time data and predictive analytics are game-changing.",
      metrics: {
        responseImprovement: '67%',
        livesImpacted: '1,247',
        timeUsing: '2 years'
      },
      badge: 'Hurricane Response Expert'
    },
    {
      id: 2,
      name: 'Captain Michael Chen',
      role: 'Fire Chief',
      organization: 'California Fire Department',
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 5,
      quote: "The wildfire prediction and resource allocation features are incredible. We can now deploy firefighting teams 30% faster and with 94% accuracy in fire spread prediction. This platform is essential for modern fire management.",
      metrics: {
        responseImprovement: '30%',
        livesImpacted: '892',
        timeUsing: '18 months'
      },
      badge: 'Wildfire Management Specialist'
    },
    {
      id: 3,
      name: 'Commander Yuki Tanaka',
      role: 'Emergency Response Coordinator',
      organization: 'Tokyo Metropolitan Government',
      location: 'Tokyo, Japan',
      avatar: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg',
      rating: 5,
      quote: "During the 7.2 earthquake, DisasterShield's urban response system coordinated 523 rescue operations with unprecedented precision. The integration with our infrastructure systems saved countless lives.",
      metrics: {
        responseImprovement: '45%',
        livesImpacted: '2,156',
        timeUsing: '3 years'
      },
      badge: 'Seismic Response Leader'
    },
    {
      id: 4,
      name: 'Dr. Emma Thompson',
      role: 'Disaster Recovery Specialist',
      organization: 'UK Emergency Management',
      location: 'London, UK',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      rating: 5,
      quote: "The post-disaster recovery tools have transformed how we help communities rebuild. The resource tracking and volunteer coordination features ensure no one falls through the cracks during recovery efforts.",
      metrics: {
        responseImprovement: '52%',
        livesImpacted: '3,450',
        timeUsing: '1.5 years'
      },
      badge: 'Recovery Systems Expert'
    },
    {
      id: 5,
      name: 'Colonel James Rodriguez',
      role: 'National Guard Commander',
      organization: 'Texas National Guard',
      location: 'Austin, TX',
      avatar: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg',
      rating: 5,
      quote: "Coordinating multi-agency responses has never been easier. The communication hub and resource management system helped us mobilize 2,000 personnel during the tornado outbreak in record time.",
      metrics: {
        responseImprovement: '58%',
        livesImpacted: '1,890',
        timeUsing: '2.5 years'
      },
      badge: 'Multi-Agency Coordination Expert'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentT = testimonials[currentTestimonial];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
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
            ⭐ Trusted by Emergency Professionals
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            What Emergency Leaders
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Say
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Hear from the heroes who use DisasterShield daily to protect communities and save lives around the world.
          </motion.p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-0">
              {/* Avatar & Info */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white text-center relative">
                <motion.div
                  className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={currentT.avatar}
                    alt={currentT.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2">{currentT.name}</h3>
                <p className="text-blue-100 mb-1">{currentT.role}</p>
                <p className="text-blue-200 text-sm mb-4">{currentT.organization}</p>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm mb-6">
                  {currentT.badge}
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(currentT.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <StarIcon className="w-5 h-5 text-yellow-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">{currentT.metrics.responseImprovement}</div>
                    <div className="text-xs text-blue-200">Response Improvement</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">{currentT.metrics.livesImpacted}</div>
                    <div className="text-xs text-blue-200">Lives Impacted</div>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse" />
                  <div className="absolute bottom-10 right-10 w-16 h-16 border border-white rounded-full animate-pulse delay-1000" />
                </div>
              </div>

              {/* Quote */}
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <motion.div
                  className="text-6xl text-blue-200 dark:text-blue-800 mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  "
                </motion.div>
                
                <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed mb-8 italic">
                  {currentT.quote}
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="text-gray-600 dark:text-gray-400">
                    <div className="font-semibold">{currentT.location}</div>
                    <div className="text-sm">Using for {currentT.metrics.timeUsing}</div>
                  </div>

                  {/* Navigation */}
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={prevTestimonial}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      onClick={nextTestimonial}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonial Thumbnails */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center space-x-4 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              variants={fadeInUp}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                index === currentTestimonial
                  ? 'border-blue-500 scale-110'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 hover:scale-105'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-4 gap-8"
        >
          {[
            { number: '500+', label: 'Emergency Professionals', icon: '👨‍🚒' },
            { number: '15', label: 'Countries Worldwide', icon: '🌍' },
            { number: '98.7%', label: 'Satisfaction Rate', icon: '⭐' },
            { number: '24/7', label: 'Support Available', icon: '🛟' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover="hover"
            >
              <motion.div
                variants={cardHover}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Join These Heroes - Start Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;