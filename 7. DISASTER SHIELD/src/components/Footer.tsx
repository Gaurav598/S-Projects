import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Emergency Services', href: '#services' },
      { name: 'Resource Locator', href: '#resources' },
      { name: 'SOS System', href: '#sos' },
      { name: 'Volunteer Portal', href: '#volunteers' },
      { name: 'Live Updates', href: '#updates' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Mission', href: '#mission' },
      { name: 'Case Studies', href: '#cases' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Training Center', href: '#training' },
      { name: 'Emergency Guides', href: '#guides' },
      { name: 'Community Forum', href: '#forum' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Accessibility', href: '#accessibility' },
      { name: 'Security', href: '#security' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'GitHub', href: '#', icon: '💻' },
    { name: 'YouTube', href: '#', icon: '📺' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-32 right-32 w-32 h-32 border border-white rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-red-700 py-4"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              className="flex items-center justify-center space-x-3"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-semibold">24/7 Emergency Hotline: 1-800-DISASTER</span>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </motion.div>
          </div>
        </motion.div>

        <div className="container mx-auto px-6 py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-12 gap-12"
          >
            {/* Brand Section */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-4 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ShieldCheckIcon className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">DisasterShield</h3>
                  <p className="text-blue-400">Emergency Management Platform</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">
                Protecting communities worldwide through intelligent disaster management, 
                rapid emergency response, and advanced technology solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <MapPinIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">Emergency Response Center, Global HQ</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <PhoneIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">+1 (800) DISASTER</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <EnvelopeIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">emergency@disastershield.com</span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-xl hover:bg-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Grid */}
            <div className="lg:col-span-8 grid md:grid-cols-4 gap-8">
              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-bold mb-6 text-blue-400">Platform</h4>
                <div className="space-y-3">
                  {footerLinks.platform.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-bold mb-6 text-blue-400">Company</h4>
                <div className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-bold mb-6 text-blue-400">Resources</h4>
                <div className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h4 className="text-lg font-bold mb-6 text-blue-400">Legal</h4>
                <div className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 py-16 border-t border-gray-700 mt-16"
          >
            {[
              { number: '50,000+', label: 'Lives Protected', icon: '🛡️' },
              { number: '15', label: 'Countries Served', icon: '🌍' },
              { number: '500+', label: 'Partner Organizations', icon: '🤝' },
              { number: '99.9%', label: 'System Uptime', icon: '⚡' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center group"
              >
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <span>&copy; {currentYear} DisasterShield. All rights reserved.</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HeartIcon className="w-4 h-4 text-red-400" />
              </motion.div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with care for global safety</span>
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>System Status: Operational</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;