import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import {
  TrophyIcon,
  FireIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  BookOpenIcon,
  PlayIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const achievements = [
    { title: 'Course Completionist', description: 'Completed 10 courses', icon: TrophyIcon, color: 'text-yellow-500' },
    { title: 'Week Streak', description: '7 days learning streak', icon: FireIcon, color: 'text-red-500' },
    { title: 'Early Bird', description: 'Completed 5 morning sessions', icon: ClockIcon, color: 'text-blue-500' },
    { title: 'Knowledge Seeker', description: 'Read 50+ articles', icon: BookOpenIcon, color: 'text-green-500' },
  ];

  const upcomingEvents = [
    { title: 'React Workshop', date: '2024-02-15', time: '2:00 PM', type: 'Workshop' },
    { title: 'AI Study Group', date: '2024-02-16', time: '6:00 PM', type: 'Study Group' },
    { title: 'Project Deadline', date: '2024-02-18', time: '11:59 PM', type: 'Deadline' },
    { title: 'Career Webinar', date: '2024-02-20', time: '4:00 PM', type: 'Webinar' },
  ];

  const learningProgress = {
    options: {
      chart: { type: 'radialBar', height: 250 },
      plotOptions: {
        radialBar: {
          hollow: { size: '50%' },
          dataLabels: {
            name: { fontSize: '16px', color: '#374151' },
            value: { fontSize: '24px', fontWeight: 600 },
          },
        },
      },
      colors: ['#3B82F6', '#8B5CF6', '#10B981'],
      labels: ['React', 'Python', 'Design'],
    },
    series: [85, 70, 92],
  };

  const weeklyActivity = {
    options: {
      chart: { type: 'area', height: 200 },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      colors: ['#3B82F6'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
    },
    series: [{
      name: 'Hours',
      data: [2.5, 3.2, 1.8, 4.1, 2.9, 3.7, 2.1]
    }],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="dashboard" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Learning{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your progress, celebrate achievements, and stay on top of your learning goals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Progress Overview */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            {/* Weekly Activity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Weekly Activity
              </h3>
              <Chart
                options={weeklyActivity.options}
                series={weeklyActivity.series}
                type="area"
                height={200}
              />
            </div>

            {/* Current Courses Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Current Courses
              </h3>
              <div className="space-y-6">
                {[
                  { name: 'Advanced React Development', progress: 85, color: 'from-blue-500 to-blue-600' },
                  { name: 'Python for Data Science', progress: 70, color: 'from-green-500 to-green-600' },
                  { name: 'UX/UI Design Principles', progress: 92, color: 'from-purple-500 to-purple-600' },
                ].map((course, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {course.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        className={`h-3 bg-gradient-to-r ${course.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Learning Progress Radial Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Skill Progress
              </h3>
              <Chart
                options={learningProgress.options}
                series={learningProgress.series}
                type="radialBar"
                height={250}
              />
            </div>

            {/* Daily Challenge */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Daily Challenge</h3>
              <p className="mb-4">Complete a React component challenge to earn 50 XP points!</p>
              <motion.button
                className="w-full py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Challenge
              </motion.button>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Upcoming Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-2">
                    <CalendarIcon className="h-4 w-4 text-primary-600 mr-2" />
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {event.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {event.date} at {event.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;