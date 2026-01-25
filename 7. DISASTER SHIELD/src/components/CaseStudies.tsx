import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  ClockIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { fadeInUp, staggerContainer, cardHover, flipCard } from '../utils/animations';

const CaseStudies: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      id: 1,
      title: 'Hurricane Maya Response',
      location: 'Florida, USA',
      date: 'September 2023',
      category: 'Natural Disaster',
      impact: {
        livesSaved: 1247,
        responseTime: '3.2 minutes',
        volunteersDeployed: 340,
        resourcesDistributed: 15000
      },
      image: 'https://images.pexels.com/photos/1119974/pexels-photo-1119974.jpeg',
      description: 'Category 4 hurricane response showcasing coordinated emergency services and community resilience.',
      detailedStory: `Hurricane Maya struck the Florida coast with devastating force, bringing sustained winds of 140 mph and life-threatening storm surge. Our disaster management platform orchestrated the largest emergency response in the region's history.

Within the first hour, our AI-powered system identified 23 high-risk zones and automatically dispatched 45 emergency response teams. The platform's real-time communication network connected over 500 first responders, enabling unprecedented coordination.

Our resource optimization algorithms ensured that emergency supplies reached the most critical areas first. Mobile emergency shelters were deployed using predictive modeling that anticipated population displacement patterns.

The volunteer coordination system mobilized 340 trained volunteers within 6 hours, while our family reunification system helped reconnect 89% of separated families within 48 hours.`,
      outcomes: [
        'Zero fatalities in covered areas',
        '98% successful evacuations',
        '24-hour power restoration in critical facilities',
        '$2.3M in prevented damages'
      ],
      technologies: ['AI Predictive Modeling', 'Real-time Communication Hub', 'Resource Optimization', 'Mobile Command Centers'],
      testimonial: {
        quote: "The coordination was unlike anything we've seen before. Every resource was exactly where it needed to be.",
        author: "Sarah Martinez",
        role: "Emergency Management Director"
      }
    },
    {
      id: 2,
      title: 'Wildfire Crisis Management',
      location: 'California, USA',
      date: 'August 2023',
      category: 'Wildfire',
      impact: {
        livesSaved: 892,
        responseTime: '2.8 minutes',
        volunteersDeployed: 156,
        resourcesDistributed: 8900
      },
      image: 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg',
      description: 'Rapid wildfire containment through AI-powered resource deployment and community evacuation.',
      detailedStory: `The Northern California wildfire season of 2023 presented unprecedented challenges. Our platform's early warning system detected the fire 23 minutes before traditional methods, providing crucial lead time for evacuation procedures.

Advanced satellite integration and machine learning algorithms predicted fire spread patterns with 94% accuracy, enabling proactive resource positioning. Firefighting teams were pre-positioned based on wind patterns and terrain analysis.

Our community alert system sent targeted evacuation notices to 12,000 residents through multiple channels including SMS, mobile apps, and emergency broadcasting. The system automatically prioritized vulnerable populations including elderly residents and those with mobility challenges.

Real-time air quality monitoring networks provided minute-by-minute updates, allowing emergency managers to make informed decisions about evacuation routes and temporary shelter locations.`,
      outcomes: [
        '89% reduction in fire spread rate',
        'Complete evacuation of 6 communities',
        '156 volunteer firefighters coordinated',
        '48-hour containment achieved'
      ],
      technologies: ['Satellite Fire Detection', 'AI Spread Prediction', 'Community Alert Systems', 'Air Quality Monitoring'],
      testimonial: {
        quote: "The early detection saved our entire community. We had time to evacuate safely thanks to the advanced warning.",
        author: "Michael Chen",
        role: "Fire Chief"
      }
    },
    {
      id: 3,
      title: 'Urban Earthquake Response',
      location: 'Tokyo, Japan',
      date: 'November 2023',
      category: 'Earthquake',
      impact: {
        livesSaved: 2156,
        responseTime: '1.9 minutes',
        volunteersDeployed: 523,
        resourcesDistributed: 23000
      },
      image: 'https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg',
      description: 'Coordinated urban earthquake response with advanced building assessment and search & rescue.',
      detailedStory: `A magnitude 7.2 earthquake struck the Tokyo metropolitan area during peak commuting hours. Our seismic monitoring network provided instant alerts to 8.5 million residents through the emergency notification system.

Structural assessment drones were deployed within 15 minutes, conducting rapid surveys of 340 high-rise buildings and critical infrastructure. AI-powered damage assessment algorithms prioritized rescue operations based on building collapse probability and population density.

The search and rescue coordination system integrated thermal imaging, acoustic sensors, and GPS tracking to optimize rescue team deployment. Mobile communication towers were rapidly deployed to restore connectivity in affected areas.

Our traffic management integration redirected 50,000 vehicles away from damaged infrastructure, preventing secondary accidents and ensuring clear emergency corridors.`,
      outcomes: [
        '98% building assessment completion in 6 hours',
        '523 successful rescues',
        'Zero secondary structural collapses',
        '72% infrastructure restored within 48 hours'
      ],
      technologies: ['Seismic Monitoring Network', 'Drone Assessment Teams', 'AI Damage Analysis', 'Emergency Communications'],
      testimonial: {
        quote: "The speed and precision of the response was incredible. Technology and human compassion working together.",
        author: "Yuki Tanaka",
        role: "Tokyo Emergency Services"
      }
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
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
            📚 Success Stories
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Real-World
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Impact
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how our disaster management platform has transformed emergency response 
            across different scenarios, saving lives and protecting communities worldwide.
          </motion.p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              variants={fadeInUp}
              whileHover="hover"
              className="group cursor-pointer"
              onClick={() => setSelectedCase(caseStudy.id)}
            >
              <motion.div
                variants={cardHover}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {caseStudy.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {caseStudy.location}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {caseStudy.date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {caseStudy.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {caseStudy.description}
                  </p>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {caseStudy.impact.livesSaved.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Lives Saved</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {caseStudy.impact.responseTime}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Response Time</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Read Full Story</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedCase(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const caseStudy = caseStudies.find(c => c.id === selectedCase);
                  if (!caseStudy) return null;

                  return (
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {caseStudy.title}
                          </h2>
                          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                            <span className="flex items-center">
                              <MapPinIcon className="w-4 h-4 mr-1" />
                              {caseStudy.location}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {caseStudy.date}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedCase(null)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <XMarkIcon className="w-6 h-6 text-gray-500" />
                        </button>
                      </div>

                      {/* Impact Stats */}
                      <div className="grid md:grid-cols-4 gap-6 mb-8">
                        {[
                          { label: 'Lives Saved', value: caseStudy.impact.livesSaved.toLocaleString(), icon: '🛡️' },
                          { label: 'Response Time', value: caseStudy.impact.responseTime, icon: '⚡' },
                          { label: 'Volunteers', value: caseStudy.impact.volunteersDeployed.toString(), icon: '👥' },
                          { label: 'Resources', value: caseStudy.impact.resourcesDistributed.toLocaleString(), icon: '📦' }
                        ].map((stat) => (
                          <div key={stat.label} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Story */}
                      <div className="space-y-6 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The Story</h3>
                        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {caseStudy.detailedStory}
                        </div>
                      </div>

                      {/* Outcomes & Technologies */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Outcomes</h4>
                          <div className="space-y-3">
                            {caseStudy.outcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                                {outcome}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                        <div className="text-2xl text-blue-600 dark:text-blue-400 mb-4">"</div>
                        <blockquote className="text-lg text-gray-800 dark:text-gray-200 mb-6 italic">
                          {caseStudy.testimonial.quote}
                        </blockquote>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {caseStudy.testimonial.author}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">
                            {caseStudy.testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;