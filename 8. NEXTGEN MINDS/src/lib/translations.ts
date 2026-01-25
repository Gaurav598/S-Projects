import { useSettingsStore } from './store';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    quiz: 'Quiz',
    recommendations: 'Recommendations',
    resources: 'Resources',
    settings: 'Settings',
    
    // Home page
    heroTitle: 'Discover Your Perfect Career',
    heroSubtitle: 'AI-powered career guidance with personalized recommendations, detailed roadmaps, and comprehensive resources to help you achieve your professional goals.',
    getStarted: 'Get Started',
    takeQuiz: 'Take Quiz',
    howItWorks: 'How It Works',
    powerfulFeatures: 'Powerful Features',
    
    // Profile Builder
    buildProfile: 'Build Your Profile',
    basicInformation: 'Basic Information',
    fullName: 'Full Name',
    age: 'Age',
    location: 'Location',
    educationLevel: 'Education Level',
    yourInterests: 'Your Interests',
    yourSkills: 'Your Skills',
    workExperience: 'Work Experience',
    careerGoals: 'Career Goals',
    previous: 'Previous',
    next: 'Next',
    completeProfile: 'Complete Profile',
    
    // Quiz
    careerAssessment: 'Career Assessment Quiz',
    quizDescription: 'Answer these questions to discover careers that match your personality and interests',
    nextQuestion: 'Next Question',
    completeQuiz: 'Complete Quiz',
    quizCompleted: 'Quiz Completed!',
    
    // Recommendations
    careerRecommendations: 'Your Career Recommendations',
    recommendationsDescription: 'Based on your profile and quiz results, here are personalized career paths that match your interests, skills, and goals.',
    salaryRange: 'Salary Range',
    jobGrowth: 'Job Growth',
    keySkills: 'Key Skills',
    careerRoadmap: 'Career Roadmap Preview',
    viewFullRoadmap: 'View Full Roadmap',
    saveForLater: 'Save for Later',
    
    // Settings
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    language: 'Language',
    accessibility: 'Accessibility',
    enableVoiceInput: 'Enable Voice Input/Output',
    reduceMotion: 'Reduce Motion (Accessibility)',
    enableNotifications: 'Enable Notifications',
    largerText: 'Larger Text',
    textToSpeech: 'Text-to-Speech',
    speechToText: 'Speech-to-Text',
    dataManagement: 'Data Management',
    exportData: 'Export Data',
    importData: 'Import Data',
    privacy: 'Privacy',
    clearAllData: 'Clear All Data',
    
    // Voice commands
    voiceCommands: 'Voice Commands',
    listening: 'Listening...',
    voiceNotSupported: 'Voice recognition not supported',
    
    // QR Code
    shareQR: 'Share QR Code',
    qrCodeTitle: 'Share this page',
    
    // Achievements
    achievements: 'Achievements',
    progress: 'Progress',
    points: 'Points',
    
    // Status
    online: 'Online',
    offline: 'Offline',
  },
  hi: {
    // Navigation
    home: 'होम',
    profile: 'प्रोफाइल',
    quiz: 'क्विज़',
    recommendations: 'सुझाव',
    resources: 'संसाधन',
    settings: 'सेटिंग्स',
    
    // Home page
    heroTitle: 'अपना आदर्श करियर खोजें',
    heroSubtitle: 'AI-संचालित करियर मार्गदर्शन व्यक्तिगत सुझावों, विस्तृत रोडमैप और व्यापक संसाधनों के साथ आपके व्यावसायिक लक्ष्यों को प्राप्त करने में मदद करता है।',
    getStarted: 'शुरू करें',
    takeQuiz: 'क्विज़ लें',
    howItWorks: 'यह कैसे काम करता है',
    powerfulFeatures: 'शक्तिशाली सुविधाएं',
    
    // Profile Builder
    buildProfile: 'अपनी प्रोफाइल बनाएं',
    basicInformation: 'बुनियादी जानकारी',
    fullName: 'पूरा नाम',
    age: 'उम्र',
    location: 'स्थान',
    educationLevel: 'शिक्षा स्तर',
    yourInterests: 'आपकी रुचियां',
    yourSkills: 'आपके कौशल',
    workExperience: 'कार्य अनुभव',
    careerGoals: 'करियर लक्ष्य',
    previous: 'पिछला',
    next: 'अगला',
    completeProfile: 'प्रोफाइल पूरी करें',
    
    // Quiz
    careerAssessment: 'करियर मूल्यांकन क्विज़',
    quizDescription: 'अपने व्यक्तित्व और रुचियों से मेल खाने वाले करियर खोजने के लिए इन प्रश्नों के उत्तर दें',
    nextQuestion: 'अगला प्रश्न',
    completeQuiz: 'क्विज़ पूरी करें',
    quizCompleted: 'क्विज़ पूरी हुई!',
    
    // Recommendations
    careerRecommendations: 'आपके करियर सुझाव',
    recommendationsDescription: 'आपकी प्रोफाइल और क्विज़ परिणामों के आधार पर, यहां व्यक्तिगत करियर पथ हैं जो आपकी रुचियों, कौशल और लक्ष्यों से मेल खाते हैं।',
    salaryRange: 'वेतन सीमा',
    jobGrowth: 'नौकरी की वृद्धि',
    keySkills: 'मुख्य कौशल',
    careerRoadmap: 'करियर रोडमैप पूर्वावलोकन',
    viewFullRoadmap: 'पूरा रोडमैप देखें',
    saveForLater: 'बाद के लिए सेव करें',
    
    // Settings
    appearance: 'दिखावट',
    theme: 'थीम',
    light: 'हल्का',
    dark: 'गहरा',
    system: 'सिस्टम',
    language: 'भाषा',
    accessibility: 'पहुंच',
    enableVoiceInput: 'आवाज़ इनपुट/आउटपुट सक्षम करें',
    reduceMotion: 'गति कम करें (पहुंच)',
    enableNotifications: 'सूचनाएं सक्षम करें',
    largerText: 'बड़ा टेक्स्ट',
    textToSpeech: 'टेक्स्ट-टू-स्पीच',
    speechToText: 'स्पीच-टू-टेक्स्ट',
    dataManagement: 'डेटा प्रबंधन',
    exportData: 'डेटा निर्यात करें',
    importData: 'डेटा आयात करें',
    privacy: 'गोपनीयता',
    clearAllData: 'सभी डेटा साफ़ करें',
    
    // Voice commands
    voiceCommands: 'आवाज़ कमांड',
    listening: 'सुन रहा है...',
    voiceNotSupported: 'आवाज़ पहचान समर्थित नहीं है',
    
    // QR Code
    shareQR: 'QR कोड साझा करें',
    qrCodeTitle: 'इस पेज को साझा करें',
    
    // Achievements
    achievements: 'उपलब्धियां',
    progress: 'प्रगति',
    points: 'अंक',
    
    // Status
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
  }
};

export const useTranslation = () => {
  const { currentLanguage } = useSettingsStore();
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };
  
  return { t, currentLanguage };
};