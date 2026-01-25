import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  UserIcon, 
  StarIcon,
  PlayIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Complete React Development',
      instructor: 'Sarah Johnson',
      category: 'Web Development',
      duration: '42 hours',
      students: 12500,
      rating: 4.9,
      progress: 75,
      price: '₹3499',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['React', 'JavaScript', 'Frontend'],
    },
    {
      id: 2,
      title: 'AI & Machine Learning Fundamentals',
      instructor: 'Dr. Michael Chen',
      category: 'Artificial Intelligence',
      duration: '38 hours',
      students: 8900,
      rating: 4.8,
      progress: 45,
      price: '₹5999',
      image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['AI', 'Python', 'Machine Learning'],
    },
    {
      id: 3,
      title: 'UX/UI Design Masterclass',
      instructor: 'Emma Rodriguez',
      category: 'Design',
      duration: '35 hours',
      students: 15200,
      rating: 4.9,
      progress: 90,
      price: '₹2999',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Design', 'Figma', 'Prototyping'],
    },
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'James Wilson',
      category: 'Data Science',
      duration: '45 hours',
      students: 9800,
      rating: 4.7,
      progress: 30,
      price: '₹2999',
      image: 'https://www.aiche.org/sites/default/files/images/courses/lead_custom_image_ela271.jpg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Python', 'Analytics', 'Visualization'],
    },
    {
      id: 5,
      title: 'Mobile App Development',
      instructor: 'Lisa Park',
      category: 'Mobile Development',
      duration: '40 hours',
      students: 11300,
      rating: 4.8,
      progress: 60,
      price: '₹2499',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['React Native', 'iOS', 'Android'],
    },
    {
      id: 6,
      title: 'Blockchain & Cryptocurrency',
      instructor: 'Alex Thompson',
      category: 'Blockchain',
      duration: '32 hours',
      students: 6700,
      rating: 4.6,
      progress: 15,
      price: '₹4999',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Blockchain', 'Solidity', 'Web3'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="courses" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Popular{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our most popular courses designed by industry experts to help you advance your career.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              }}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-sm font-medium text-gray-900 dark:text-white rounded-full backdrop-blur-sm">
                    {course.category}
                  </span>
                </div>

                {/* Bookmark Icon */}
                <motion.button
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BookmarkIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </motion.button>

                {/* Play Button */}
                <motion.button
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-16 h-16 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <PlayIcon className="h-8 w-8 text-primary-600 ml-1" />
                  </div>
                </motion.button>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  by {course.instructor}
                </p>

                {/* Course Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {course.price}
                  </div>
                  <motion.button
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Courses Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;