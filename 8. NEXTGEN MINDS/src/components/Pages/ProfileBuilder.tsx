import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { ProgressBar } from '../UI/ProgressBar';
import { useProfileStore, useProgressStore } from '../../lib/store';
import { useTranslation } from '../../lib/translations';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Profile } from '../../lib/store';

const TOTAL_STEPS = 6;

const educationLevels = [
  'High School',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Professional Degree'
];

const interestOptions = [
  'Technology', 'Healthcare', 'Education', 'Finance', 'Arts & Design',
  'Engineering', 'Business', 'Science', 'Social Work', 'Sports',
  'Media & Communications', 'Law', 'Environment', 'Travel & Tourism'
];

const skillOptions = [
  'Programming', 'Writing', 'Public Speaking', 'Leadership', 'Analytics',
  'Creative Design', 'Problem Solving', 'Project Management', 'Sales',
  'Teaching', 'Research', 'Customer Service', 'Marketing', 'Finance'
];

const experienceLevels = [
  'No Experience',
  '1-2 Years',
  '3-5 Years',
  '5-10 Years',
  '10+ Years'
];

const careerGoals = [
  'High Salary',
  'Work-Life Balance',
  'Job Security',
  'Creative Freedom',
  'Helping Others',
  'Leadership Role',
  'Remote Work',
  'Entrepreneurship',
  'Continuous Learning',
  'Travel Opportunities'
];

export const ProfileBuilder: React.FC = () => {
  const { profile, profileStep, setProfile, setProfileStep } = useProfileStore();
  const { updateProgress, addAchievement } = useProgressStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Profile>>(profile || {});
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const progress = ((profileStep + 1) / TOTAL_STEPS) * 100;

  const updateFormData = (updates: Partial<Profile>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (profileStep < TOTAL_STEPS - 1) {
      setProfileStep(profileStep + 1);
    }
  };

  const prevStep = () => {
    if (profileStep > 0) {
      setProfileStep(profileStep - 1);
    }
  };

  const saveProfile = () => {
    const completeProfile: Profile = {
      name: formData.name || '',
      age: formData.age || 18,
      education: formData.education || '',
      interests: formData.interests || [],
      skills: formData.skills || [],
      experience: formData.experience || '',
      goals: formData.goals || [],
      location: formData.location || '',
      completedAt: new Date()
    };
    
    setProfile(completeProfile);
    
    // Update progress and add achievement
    updateProgress({ profileCompletion: 100 });
    addAchievement({
      id: 'profile-complete',
      title: 'Profile Master',
      description: 'Completed your full profile',
      icon: '👤',
      category: 'profile'
    });
    
    // Could redirect to quiz or recommendations here
  };

  const isStepValid = () => {
    switch (profileStep) {
      case 0: return formData.name && formData.age;
      case 1: return formData.education;
      case 2: return formData.interests && formData.interests.length > 0;
      case 3: return formData.skills && formData.skills.length > 0;
      case 4: return formData.experience;
      case 5: return formData.goals && formData.goals.length > 0;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (profileStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.fadeIn}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <UserIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('basicInformation')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Let's start with some basic details about you
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('age')} *
                </label>
                <input
                  type="number"
                  min="16"
                  max="100"
                  value={formData.age || ''}
                  onChange={(e) => updateFormData({ age: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('location')}
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => updateFormData({ location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step-1"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.fadeIn}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <AcademicCapIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('educationLevel')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                What's your highest level of education?
              </p>
            </div>

            <div className="grid gap-3">
              {educationLevels.map((level) => (
                <motion.button
                  key={level}
                  whileHover={reducedMotion ? {} : { scale: 1.02 }}
                  whileTap={reducedMotion ? {} : { scale: 0.98 }}
                  onClick={() => updateFormData({ education: level })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.education === level
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                  }`}
                >
                  {level}
                  {formData.education === level && (
                    <CheckIcon className="h-5 w-5 text-primary-600 float-right" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step-2"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.fadeIn}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <HeartIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('yourInterests')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select the areas that interest you most (choose 3-5)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => {
                const isSelected = formData.interests?.includes(interest);
                return (
                  <motion.button
                    key={interest}
                    whileHover={reducedMotion ? {} : { scale: 1.02 }}
                    whileTap={reducedMotion ? {} : { scale: 0.98 }}
                    onClick={() => {
                      const currentInterests = formData.interests || [];
                      if (isSelected) {
                        updateFormData({
                          interests: currentInterests.filter(i => i !== interest)
                        });
                      } else {
                        updateFormData({
                          interests: [...currentInterests, interest]
                        });
                      }
                    }}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                    }`}
                  >
                    {interest}
                    {isSelected && (
                      <CheckIcon className="h-4 w-4 text-primary-600 ml-2 inline" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Selected: {formData.interests?.length || 0} interests
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step-3"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.fadeIn}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <WrenchScrewdriverIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('yourSkills')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                What skills do you have or want to develop? (choose 3-5)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillOptions.map((skill) => {
                const isSelected = formData.skills?.includes(skill);
                return (
                  <motion.button
                    key={skill}
                    whileHover={reducedMotion ? {} : { scale: 1.02 }}
                    whileTap={reducedMotion ? {} : { scale: 0.98 }}
                    onClick={() => {
                      const currentSkills = formData.skills || [];
                      if (isSelected) {
                        updateFormData({
                          skills: currentSkills.filter(s => s !== skill)
                        });
                      } else {
                        updateFormData({
                          skills: [...currentSkills, skill]
                        });
                      }
                    }}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                    }`}
                  >
                    {skill}
                    {isSelected && (
                      <CheckIcon className="h-4 w-4 text-primary-600 ml-2 inline" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Selected: {formData.skills?.length || 0} skills
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.fadeIn}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <BriefcaseIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('workExperience')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                How much professional experience do you have?
              </p>
            </div>

            <div className="grid gap-3">
              {experienceLevels.map((level) => (
                <motion.button
                  key={level}
                  whileHover={reducedMotion ? {} : { scale: 1.02 }}
                  whileTap={reducedMotion ? {} : { scale: 0.98 }}
                  onClick={() => updateFormData({ experience: level })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.experience === level
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                  }`}
                >
                  {level}
                  {formData.experience === level && (
                    <CheckIcon className="h-5 w-5 text-primary-600 float-right" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step-5"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants.fadeIn}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <MapPinIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('careerGoals')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                What's most important to you in your career? (choose 3-5)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {careerGoals.map((goal) => {
                const isSelected = formData.goals?.includes(goal);
                return (
                  <motion.button
                    key={goal}
                    whileHover={reducedMotion ? {} : { scale: 1.02 }}
                    whileTap={reducedMotion ? {} : { scale: 0.98 }}
                    onClick={() => {
                      const currentGoals = formData.goals || [];
                      if (isSelected) {
                        updateFormData({
                          goals: currentGoals.filter(g => g !== goal)
                        });
                      } else {
                        updateFormData({
                          goals: [...currentGoals, goal]
                        });
                      }
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                    }`}
                  >
                    {goal}
                    {isSelected && (
                      <CheckIcon className="h-5 w-5 text-primary-600 float-right" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Selected: {formData.goals?.length || 0} goals
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.pageTransition}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants.slideUp}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t('buildProfile')}
          </h1>
          <ProgressBar progress={progress} className="mb-6" />
          <p className="text-center text-gray-600 dark:text-gray-300">
            Step {profileStep + 1} of {TOTAL_STEPS}
          </p>
        </motion.div>

        <Card className="p-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="flex justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={profileStep === 0}
              className="flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              {t('previous')}
            </Button>

            {profileStep === TOTAL_STEPS - 1 ? (
              <Button
                variant="primary"
                onClick={saveProfile}
                disabled={!isStepValid()}
                className="flex items-center"
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                {t('completeProfile')}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center"
              >
                {t('next')}
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};