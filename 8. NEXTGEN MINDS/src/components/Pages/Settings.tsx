import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  MicrophoneIcon,
  EyeSlashIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BellIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { useSettingsStore, useAppStore, useProgressStore } from '../../lib/store';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from '../../lib/translations';
import { exportData, importData, clearAllData } from '../../lib/database';
import { motionVariants } from '../../lib/motionVariants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ProgressDisplay, AchievementBadge } from '../UI/AchievementBadge';

export const Settings: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { clearAllData: clearStoreData } = useAppStore();
  const { progress } = useProgressStore();
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [importLoading, setImportLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? {} : motionVariants;

  const handleExportData = async () => {
    setExportLoading(true);
    try {
      await exportData();
      // Could show success message
    } catch (error) {
      console.error('Export failed:', error);
      // Could show error message
    } finally {
      setExportLoading(false);
    }
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportLoading(true);
    try {
      const success = await importData(file);
      if (success) {
        // Could show success message and refresh the app
        window.location.reload();
      } else {
        // Could show error message
      }
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setImportLoading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleClearAllData = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all data? This action cannot be undone.'
    );
    
    if (confirmed) {
      setClearLoading(true);
      try {
        await clearAllData();
        clearStoreData();
        // Could show success message
      } catch (error) {
        console.error('Clear data failed:', error);
      } finally {
        setClearLoading(false);
      }
    }
  };

  const themeOptions = [
    { key: 'light', label: t('light'), icon: SunIcon },
    { key: 'dark', label: t('dark'), icon: MoonIcon },
    { key: 'system', label: t('system'), icon: ComputerDesktopIcon }
  ] as const;

  // Apply larger text class to body if enabled
  React.useEffect(() => {
    if (settings.largerText) {
      document.body.classList.add('text-lg');
    } else {
      document.body.classList.remove('text-lg');
    }
  }, [settings.largerText]);

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
          className="text-center mb-12"
        >
          <Cog6ToothIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('settings')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Customize your NextGen Minds experience
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Progress & Achievements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <SpeakerWaveIcon className="h-6 w-6 mr-2 text-primary-600" />
                {t('progress')} & {t('achievements')}
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ProgressDisplay
                      label="Profile Completion"
                      progress={progress.profileCompletion}
                      color="primary"
                    />
                    <ProgressDisplay
                      label="Quiz Progress"
                      progress={progress.quizCompletion}
                      color="secondary"
                    />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {progress.totalPoints}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total {t('points')}
                    </div>
                  </div>
                </div>
                
                {progress.achievements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      Recent {t('achievements')}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {progress.achievements.slice(-5).map((achievement) => (
                        <AchievementBadge
                          key={achievement.id}
                          achievement={achievement}
                          size="md"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <SunIcon className="h-6 w-6 mr-2 text-primary-600" />
                {t('appearance')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t('theme')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.key}
                          whileHover={reducedMotion ? {} : { scale: 1.02 }}
                          whileTap={reducedMotion ? {} : { scale: 0.98 }}
                          onClick={() => setTheme(option.key)}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            theme === option.key
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500'
                          }`}
                        >
                          <Icon className="h-6 w-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Language & Accessibility */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <LanguageIcon className="h-6 w-6 mr-2 text-primary-600" />
                {t('language')} & {t('accessibility')}
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.voiceEnabled}
                      onChange={(e) => updateSettings({ voiceEnabled: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                    />
                    <MicrophoneIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('enableVoiceInput')}
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.ttsEnabled}
                      onChange={(e) => updateSettings({ ttsEnabled: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                    />
                    <SpeakerWaveIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('textToSpeech')}
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.sttEnabled}
                      onChange={(e) => updateSettings({ sttEnabled: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                    />
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('speechToText')}
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.largerText}
                      onChange={(e) => updateSettings({ largerText: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('largerText')}
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                    />
                    <EyeSlashIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('reduceMotion')}
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => updateSettings({ notifications: e.target.checked })}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                    />
                    <BellIcon className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('enableNotifications')}
                    </span>
                  </label>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <ArrowDownTrayIcon className="h-6 w-6 mr-2 text-primary-600" />
                {t('dataManagement')}
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleExportData}
                    loading={exportLoading}
                    className="flex items-center justify-center"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                    {t('exportData')}
                  </Button>
                  
                  <div>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                      id="import-data"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('import-data')?.click()}
                      loading={importLoading}
                      className="w-full flex items-center justify-center"
                    >
                      <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                      {t('importData')}
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Export your profile, quiz results, and progress as a backup file. 
                  Import to restore your data from a previous backup.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <EyeSlashIcon className="h-6 w-6 mr-2 text-primary-600" />
                {t('privacy')}
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.privacyMode}
                    onChange={(e) => updateSettings({ privacyMode: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Privacy Mode (Clear data on browser close)
                  </span>
                </label>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {t('clearAllData')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Permanently delete all your profile data, quiz results, progress, and chat history. This action cannot be undone.
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={handleClearAllData}
                    loading={clearLoading}
                    className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    {t('clearAllData')}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Reset Settings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants.slideUp}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Reset Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Reset all settings to their default values. This will not affect your profile or quiz data.
              </p>
              
              <Button
                variant="outline"
                onClick={() => {
                  if (window.confirm('Reset all settings to default values?')) {
                    resetSettings();
                  }
                }}
                className="flex items-center"
              >
                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};