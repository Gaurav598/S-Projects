import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import Chart from 'react-apexcharts';
import { fadeInUp, staggerContainer, cardHover } from '../utils/animations';

const Statistics: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animated Counter Hook
  const useAnimatedCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isInView) return;
      
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress >= 1) {
          clearInterval(timer);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [end, duration, isInView]);
    
    return count;
  };

  // Chart configurations
  const responseTimeChartOptions = {
    chart: {
      type: 'area' as const,
      height: 350,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#3B82F6', '#10B981'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#6B7280' } }
    },
    yaxis: {
      labels: { style: { colors: '#6B7280' } }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    },
    legend: {
      position: 'top' as const,
      labels: { colors: '#6B7280' }
    }
  };

  const responseTimeChartData = [
    {
      name: 'Response Time (minutes)',
      data: [8.5, 7.2, 6.8, 5.9, 4.2, 3.8]
    },
    {
      name: 'Recovery Time (hours)',
      data: [24, 20, 18, 15, 12, 8]
    }
  ];

  const impactChartOptions = {
    chart: {
      type: 'donut' as const,
      height: 350,
    },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    labels: ['Lives Saved', 'Resources Distributed', 'Volunteers Mobilized', 'Communities Protected'],
    legend: {
      position: 'bottom' as const,
      labels: { colors: '#6B7280' }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.round(val) + "%";
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Impact',
              color: '#6B7280'
            }
          }
        }
      }
    }
  };

  const impactChartData = [35, 25, 25, 15];

  const statistics = [
    {
      title: 'Lives Saved',
      value: useAnimatedCounter(50247),
      suffix: '+',
      icon: '🛡️',
      color: 'blue',
      description: 'Through emergency response coordination'
    },
    {
      title: 'Response Time',
      value: useAnimatedCounter(3.2),
      suffix: 'min',
      icon: '⚡',
      color: 'green',
      description: 'Average emergency response time'
    },
    {
      title: 'Active Volunteers',
      value: useAnimatedCounter(12500),
      suffix: '+',
      icon: '👥',
      color: 'purple',
      description: 'Trained emergency responders'
    },
    {
      title: 'Success Rate',
      value: useAnimatedCounter(98.7),
      suffix: '%',
      icon: '🎯',
      color: 'yellow',
      description: 'Emergency resolution success'
    },
    {
      title: 'Countries Served',
      value: useAnimatedCounter(15),
      suffix: '',
      icon: '🌍',
      color: 'red',
      description: 'Global emergency network'
    },
    {
      title: 'Resources Deployed',
      value: useAnimatedCounter(8420),
      suffix: '+',
      icon: '📦',
      color: 'indigo',
      description: 'Emergency supplies distributed'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
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
            📊 Impact Statistics
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Measurable
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Impact
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Data-driven insights showcase our commitment to saving lives and building resilient 
            communities through advanced disaster management technology.
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={fadeInUp}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHover}
                className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center h-full hover:border-${stat.color}-200 dark:hover:border-${stat.color}-800 transition-all duration-300`}
              >
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                >
                  {stat.icon}
                </motion.div>

                {/* Value */}
                <div className="mb-4">
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2"
                    animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    <span className={`text-${stat.color}-500`}>{stat.suffix}</span>
                  </motion.div>
                  
                  <h3 className={`text-lg font-semibold text-${stat.color}-600 dark:text-${stat.color}-400 mb-3`}>
                    {stat.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : { width: 0 }}
                      transition={{ delay: index * 0.3, duration: 1.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Response Time Chart */}
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Response Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous improvement in emergency response times
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Chart
                options={responseTimeChartOptions}
                series={responseTimeChartData}
                type="area"
                height={350}
              />
            </motion.div>
          </motion.div>

          {/* Impact Distribution Chart */}
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Impact Distribution
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                How our platform creates measurable impact
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Chart
                options={impactChartOptions}
                series={impactChartData}
                type="donut"
                height={350}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Real-time Dashboard Preview */}
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
              Real-Time Analytics Dashboard
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            >
              Access comprehensive real-time data and analytics to make informed decisions 
              during emergency situations and track long-term community resilience.
            </motion.p>
            <motion.button
              variants={cardHover}
              whileHover="hover"
              whileTap="tap"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              View Live Dashboard
            </motion.button>
          </div>

          {/* Animated Background */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;