import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon,
  BanknotesIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { useCareerStore, useQuizStore, useProfileStore } from '../../lib/store';
import { useTranslation } from '../../lib/translations';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Career } from '../../lib/store';

// Sample career data (in real app, this would come from data/careers.json)
const sampleCareers: Career[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications and systems. Work with various programming languages and technologies to create solutions that meet user needs.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong programming skills in multiple languages',
      'Problem-solving and analytical thinking',
      'Understanding of software development lifecycle'
    ],
    skills: ['Programming', 'Problem Solving', 'Analytical Thinking', 'Teamwork'],
    salary: { min: 65000, max: 150000 },
    growth: 'Excellent - 22% growth expected',
    roadmap: [
      {
        id: 'education',
        title: 'Complete Computer Science Education',
        description: 'Get a bachelor\'s degree in Computer Science or related field',
        duration: '4 years',
        resources: ['University programs', 'Online courses', 'Coding bootcamps'],
        completed: false,
        category: 'education'
      },
      {
        id: 'basic-programming',
        title: 'Learn Core Programming Languages',
        description: 'Master fundamental programming languages like Python, JavaScript, or Java',
        duration: '6-12 months',
        resources: ['Codecademy', 'FreeCodeCamp', 'LeetCode'],
        completed: false,
        category: 'skill'
      },
      {
        id: 'portfolio',
        title: 'Build Portfolio Projects',
        description: 'Create 5-10 projects showcasing different skills and technologies',
        duration: '3-6 months',
        resources: ['GitHub', 'Personal website', 'Open source contributions'],
        completed: false,
        category: 'experience'
      },
      {
        id: 'internship',
        title: 'Complete Internships',
        description: 'Gain practical experience through internships or entry-level positions',
        duration: '3-12 months',
        resources: ['Company internship programs', 'Networking events', 'Job boards'],
        completed: false,
        category: 'experience'
      },
      {
        id: 'specialization',
        title: 'Choose Specialization',
        description: 'Focus on specific areas like web development, mobile apps, or data science',
        duration: '1-2 years',
        resources: ['Advanced courses', 'Certifications', 'Mentorship'],
        completed: false,
        category: 'skill'
      },
      {
        id: 'certification',
        title: 'Get Professional Certifications',
        description: 'Obtain relevant certifications to validate your expertise',
        duration: '3-6 months',
        resources: ['AWS Certifications', 'Google Cloud', 'Microsoft Azure'],
        completed: false,
        category: 'certification'
      }
    ],
    matchScore: 95
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    description: 'Create intuitive and engaging user experiences for digital products. Research user needs, design interfaces, and collaborate with development teams.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      'Strong design portfolio',
      'Proficiency in design tools like Figma, Sketch, Adobe Creative Suite',
      'Understanding of user-centered design principles'
    ],
    skills: ['Creative Design', 'User Research', 'Prototyping', 'Communication'],
    salary: { min: 55000, max: 120000 },
    growth: 'Strong - 13% growth expected',
    roadmap: [
      {
        id: 'design-education',
        title: 'Study Design Fundamentals',
        description: 'Learn design principles, color theory, typography, and composition',
        duration: '6-12 months',
        resources: ['Design courses', 'Books on design', 'Online tutorials'],
        completed: false,
        category: 'education'
      },
      {
        id: 'design-tools',
        title: 'Master Design Tools',
        description: 'Become proficient in Figma, Sketch, Adobe XD, and other design software',
        duration: '3-6 months',
        resources: ['Tool documentation', 'YouTube tutorials', 'Practice projects'],
        completed: false,
        category: 'skill'
      },
      {
        id: 'user-research',
        title: 'Learn User Research Methods',
        description: 'Understand how to conduct user interviews, surveys, and usability testing',
        duration: '3-4 months',
        resources: ['UX research courses', 'Books on UX research', 'Case studies'],
        completed: false,
        category: 'skill'
      },
      {
        id: 'portfolio-design',
        title: 'Build Design Portfolio',
        description: 'Create a comprehensive portfolio showcasing your best work',
        duration: '3-6 months',
        resources: ['Portfolio websites', 'Case study templates', 'Peer feedback'],
        completed: false,
        category: 'experience'
      },
      {
        id: 'design-internship',
        title: 'Gain Professional Experience',
        description: 'Work as a design intern or junior designer to build real-world experience',
        duration: '6-12 months',
        resources: ['Company design teams', 'Freelance projects', 'Design agencies'],
        completed: false,
        category: 'experience'
      },
      {
        id: 'advanced-skills',
        title: 'Develop Advanced Skills',
        description: 'Learn advanced topics like design systems, accessibility, and emerging technologies',
        duration: '1-2 years',
        resources: ['Advanced courses', 'Design conferences', 'Industry publications'],
        completed: false,
        category: 'skill'
      }
    ],
    matchScore: 88
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to extract insights and drive business decisions. Use statistical methods, machine learning, and programming to solve data-driven problems.',
    requirements: [
      'Master\'s degree in Statistics, Mathematics, Computer Science, or related field',
      'Strong programming skills in Python/R',
      'Knowledge of machine learning algorithms',
      'Statistical analysis and data visualization skills'
    ],
    skills: ['Analytics', 'Programming', 'Statistics', 'Machine Learning'],
    salary: { min: 75000, max: 180000 },
    growth: 'Excellent - 31% growth expected',
    roadmap: [
      {
        id: 'math-stats',
        title: 'Master Mathematics and Statistics',
        description: 'Build strong foundation in calculus, linear algebra, and statistics',
        duration: '1-2 years',
        resources: ['University courses', 'Khan Academy', 'Coursera'],
        completed: false,
        category: 'education'
      },
      {
        id: 'programming-data',
        title: 'Learn Programming for Data Science',
        description: 'Master Python/R, SQL, and data manipulation libraries',
        duration: '6-12 months',
        resources: ['Python.org', 'Kaggle Learn', 'DataCamp'],
        completed: false,
        category: 'skill'
      },
      {
        id: 'machine-learning',
        title: 'Study Machine Learning',
        description: 'Understand ML algorithms, model evaluation, and deployment',
        duration: '6-8 months',
        resources: ['Coursera ML course', 'Scikit-learn documentation', 'ML papers'],
        completed: false,
        category: 'skill'
      },
      {
        id: 'data-projects',
        title: 'Complete Data Science Projects',
        description: 'Build end-to-end projects demonstrating your skills',
        duration: '3-6 months',
        resources: ['Kaggle competitions', 'GitHub projects', 'Personal datasets'],
        completed: false,
        category: 'experience'
      },
      {
        id: 'advanced-degree',
        title: 'Consider Advanced Degree',
        description: 'Get Master\'s or PhD for advanced positions and research roles',
        duration: '2-5 years',
        resources: ['Graduate programs', 'Research opportunities', 'Thesis projects'],
        completed: false,
        category: 'education'
      },
      {
        id: 'industry-experience',
        title: 'Gain Industry Experience',
        description: 'Work on real business problems and learn domain expertise',
        duration: '1-3 years',
        resources: ['Internships', 'Entry-level positions', 'Consulting projects'],
        completed: false,
        category: 'experience'
      }
    ],
    matchScore: 82
  }
];

export const Recommendations: React.FC = () => {
  const { recommendations, setRecommendations, setSelectedCareer } = useCareerStore();
  const { currentQuiz } = useQuizStore();
  const { profile } = useProfileStore();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  useEffect(() => {
    // Load recommendations based on quiz results and profile
    const loadRecommendations = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter and sort sample careers based on quiz results
      let filteredCareers = [...sampleCareers];
      
      if (currentQuiz) {
        // Use quiz recommendations to filter careers
        filteredCareers = sampleCareers.filter(career => 
          currentQuiz.recommendations.includes(career.title)
        );
      }
      
      // If no quiz results, show all sample careers
      if (filteredCareers.length === 0) {
        filteredCareers = sampleCareers;
      }
      
      setRecommendations(filteredCareers);
      setLoading(false);
    };

    loadRecommendations();
  }, [currentQuiz, profile, setRecommendations]);

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const handleViewCareer = (career: Career) => {
    setSelectedCareer(career);
  };

  if (loading) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants.pageTransition}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading your personalized recommendations...</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.pageTransition}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants.slideUp}
          className="text-center mb-12"
        >
          <LightBulbIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('careerRecommendations')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('recommendationsDescription')}
          </p>
          
          {!currentQuiz && !profile && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-amber-800 dark:text-amber-300">
                Complete your <Link to="/profile" className="font-semibold underline">profile</Link> and take the 
                <Link to="/quiz" className="font-semibold underline ml-1">career quiz</Link> for more personalized recommendations.
              </p>
            </div>
          )}
        </motion.div>

        {recommendations.length === 0 ? (
          <Card className="p-12 text-center">
            <LightBulbIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Recommendations Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Complete your profile and take the career quiz to get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile">
                <Button variant="primary" size="lg">
                  Build Profile
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" size="lg">
                  Take Quiz
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants.staggerContainer}
            className="grid gap-8"
          >
            {recommendations.map((career, index) => (
              <motion.div
                key={career.id}
                variants={variants.staggerItem}
                whileHover={reducedMotion ? {} : { y: -4 }}
                className="group"
              >
                <Card className="p-8 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 lg:pr-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-xl">#{index + 1}</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {career.title}
                          </h2>
                          {career.matchScore && (
                            <div className="flex items-center mt-1">
                              <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                {career.matchScore}% Match
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {career.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <BanknotesIcon className="h-5 w-5 mr-2 text-green-500" />
                            {t('salaryRange')}
                          </h3>
                          <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                            {formatSalary(career.salary.min, career.salary.max)}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-blue-500" />
                            {t('jobGrowth')}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">
                            {career.growth}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                          {t('keySkills')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <ClockIcon className="h-5 w-5 mr-2 text-accent-500" />
                          {t('careerRoadmap')}
                        </h3>
                        <div className="grid gap-2">
                          {career.roadmap.slice(0, 3).map((step, stepIndex) => (
                            <div key={step.id} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3 text-xs font-medium">
                                {stepIndex + 1}
                              </div>
                              <span>{step.title}</span>
                              <span className="ml-auto text-accent-600 dark:text-accent-400 font-medium">
                                {step.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                        {career.roadmap.length > 3 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            +{career.roadmap.length - 3} more steps...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-shrink-0 mt-6 lg:mt-0">
                      <Link to={`/career/${career.id}`}>
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          className="group-hover:scale-105 transition-transform"
                          onClick={() => handleViewCareer(career)}
                        >
                          {t('viewFullRoadmap')}
                          <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      
                      <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={() => {
                          // Could implement career comparison or save for later
                          console.log('Save career for later:', career.title);
                        }}
                      >
                        {t('saveForLater')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {recommendations.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
            className="mt-12 text-center"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Choose a career path and begin working through your personalized roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/resources">
                  <Button variant="secondary" size="lg">
                    Explore Resources
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Back to Top
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};