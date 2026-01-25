import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { ProgressBar } from '../UI/ProgressBar';
import { useQuizStore, useProgressStore } from '../../lib/store';
import { useTranslation } from '../../lib/translations';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { QuizQuestion, QuizResult } from '../../lib/store';

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What type of work environment do you thrive in?',
    options: [
      'Collaborative team settings with lots of interaction',
      'Independent work with minimal supervision',
      'Fast-paced, high-energy environments',
      'Quiet, structured environments with clear processes'
    ],
    category: 'personality'
  },
  {
    id: '2',
    question: 'Which of these activities sounds most appealing to you?',
    options: [
      'Solving complex technical problems',
      'Helping people achieve their goals',
      'Creating and designing new things',
      'Analyzing data and finding patterns'
    ],
    category: 'interests'
  },
  {
    id: '3',
    question: 'What motivates you most in your work?',
    options: [
      'Making a positive impact on society',
      'Financial success and stability',
      'Personal growth and learning',
      'Recognition and achievement'
    ],
    category: 'values'
  },
  {
    id: '4',
    question: 'How do you prefer to learn new skills?',
    options: [
      'Hands-on practice and experimentation',
      'Reading books and research papers',
      'Learning from mentors and experts',
      'Taking structured courses and training'
    ],
    category: 'skills'
  },
  {
    id: '5',
    question: 'What\'s your ideal work-life balance?',
    options: [
      'Work is my passion - I\'m happy to dedicate most of my time to it',
      'I want a clear separation between work and personal time',
      'I prefer flexible hours that allow me to manage both effectively',
      'I want work that doesn\'t feel like work - something I truly enjoy'
    ],
    category: 'goals'
  }
];

export const Quiz: React.FC = () => {
  const { currentQuiz, setQuizResult, setQuizProgress } = useQuizStore();
  const { updateProgress, addAchievement } = useProgressStore();
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeStarted] = useState(Date.now());
  const [selectedOption, setSelectedOption] = useState<string>('');
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      const updatedAnswers = {
        ...answers,
        [quizQuestions[currentQuestion].id]: selectedOption
      };
      setAnswers(updatedAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
        setQuizProgress(((currentQuestion + 2) / quizQuestions.length) * 100);
      } else {
        completeQuiz(updatedAnswers);
      }
    }
  };

  const completeQuiz = (finalAnswers: Record<string, string>) => {
    const timeCompleted = Date.now();
    const duration = timeCompleted - timeStarted;

    // Calculate scores based on answers
    const scores = calculateScores(finalAnswers);
    
    // Generate recommendations based on scores
    const recommendations = generateRecommendations(scores);

    const result: QuizResult = {
      answers: finalAnswers,
      scores,
      completedAt: new Date(),
      recommendations
    };

    setQuizResult(result);
    setQuizProgress(100);
    
    // Update progress and add achievement
    updateProgress({ quizCompletion: 100 });
    addAchievement({
      id: 'quiz-complete',
      title: 'Quiz Master',
      description: 'Completed the career assessment',
      icon: '🎯',
      category: 'quiz'
    });
  };

  const calculateScores = (answers: Record<string, string>) => {
    const scores: Record<string, number> = {
      technical: 0,
      creative: 0,
      social: 0,
      analytical: 0,
      leadership: 0,
      entrepreneurial: 0
    };

    // Simple scoring logic based on answer patterns
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const answerIndex = question?.options.indexOf(answer) || 0;

      // Scoring logic based on question and answer
      switch (questionId) {
        case '1': // Work environment
          if (answerIndex === 0) scores.social += 2;
          if (answerIndex === 1) scores.technical += 2;
          if (answerIndex === 2) scores.entrepreneurial += 2;
          if (answerIndex === 3) scores.analytical += 2;
          break;
        case '2': // Activities
          if (answerIndex === 0) scores.technical += 3;
          if (answerIndex === 1) scores.social += 3;
          if (answerIndex === 2) scores.creative += 3;
          if (answerIndex === 3) scores.analytical += 3;
          break;
        case '3': // Motivation
          if (answerIndex === 0) scores.social += 2;
          if (answerIndex === 1) scores.entrepreneurial += 2;
          if (answerIndex === 2) scores.technical += 1; scores.creative += 1;
          if (answerIndex === 3) scores.leadership += 2;
          break;
        case '4': // Learning style
          if (answerIndex === 0) scores.technical += 1; scores.creative += 1;
          if (answerIndex === 1) scores.analytical += 2;
          if (answerIndex === 2) scores.social += 1; scores.leadership += 1;
          if (answerIndex === 3) scores.technical += 1;
          break;
        case '5': // Work-life balance
          if (answerIndex === 0) scores.entrepreneurial += 2;
          if (answerIndex === 1) scores.analytical += 1;
          if (answerIndex === 2) scores.leadership += 1;
          if (answerIndex === 3) scores.creative += 2;
          break;
      }
    });

    return scores;
  };

  const generateRecommendations = (scores: Record<string, number>) => {
    const sortedScores = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    const recommendations: string[] = [];

    sortedScores.forEach(([category, score]) => {
      switch (category) {
        case 'technical':
          recommendations.push('Software Developer', 'Data Scientist', 'Cybersecurity Analyst');
          break;
        case 'creative':
          recommendations.push('UX/UI Designer', 'Marketing Manager', 'Content Creator');
          break;
        case 'social':
          recommendations.push('Human Resources Manager', 'Counselor', 'Teacher');
          break;
        case 'analytical':
          recommendations.push('Business Analyst', 'Financial Advisor', 'Research Scientist');
          break;
        case 'leadership':
          recommendations.push('Project Manager', 'Team Lead', 'Operations Manager');
          break;
        case 'entrepreneurial':
          recommendations.push('Startup Founder', 'Business Consultant', 'Sales Manager');
          break;
      }
    });

    // Return unique recommendations (first 3)
    return [...new Set(recommendations)].slice(0, 3);
  };

  if (currentQuiz) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants.pageTransition}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants.slideUp}
            className="text-center mb-8"
          >
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('quizCompleted')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Based on your answers, here are your top career recommendations:
            </p>
          </motion.div>

          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Career Matches
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {currentQuiz.recommendations.map((career, index) => (
                <motion.div
                  key={career}
                  initial="hidden"
                  animate="visible"
                  variants={variants.staggerItem}
                  className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl"
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    #{index + 1}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {career}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Personality Profile
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(currentQuiz.scores).map(([category, score]) => (
                  <div key={category} className="text-center">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {category}
                    </div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {score}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/recommendations'}
                  variant="primary"
                  size="lg"
                  className="flex items-center"
                >
                  View Detailed Recommendations
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  onClick={() => {
                    setQuizResult(null);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSelectedOption('');
                    setQuizProgress(0);
                  }}
                  variant="outline"
                  size="lg"
                >
                  Retake Quiz
                </Button>
              </div>
            </div>
          </Card>
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants.slideUp}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <QuestionMarkCircleIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Career Assessment Quiz
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Answer these questions to discover careers that match your personality and interests
            </p>
          </div>
          
          <ProgressBar progress={progress} className="mb-4" />
          
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            {t('careerAssessment')}
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>~10 minutes</span>
            {t('quizDescription')}
          </div>
        </motion.div>

        <Card className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants.slideInFromRight}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={reducedMotion ? {} : { scale: 1.02 }}
                    whileTap={reducedMotion ? {} : { scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedOption === option
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 ${
                        selectedOption === option
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedOption === option && (
                          <CheckCircleIcon className="h-3 w-3 text-white m-0.5" />
                        )}
                      </div>
                      <span className="text-sm md:text-base leading-relaxed">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-end pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  className="flex items-center"
                  size="lg"
                >
                  {currentQuestion === quizQuestions.length - 1 ? t('completeQuiz') : t('nextQuestion')}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </motion.div>
  );
};