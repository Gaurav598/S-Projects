import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Profile {
  name: string;
  age: number;
  education: string;
  interests: string[];
  skills: string[];
  experience: string;
  goals: string[];
  location: string;
  completedAt?: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  category: 'interests' | 'skills' | 'values' | 'personality' | 'goals';
}

export interface QuizResult {
  answers: Record<string, string>;
  scores: Record<string, number>;
  completedAt: Date;
  recommendations: string[];
}

export interface Career {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary: { min: number; max: number };
  growth: string;
  roadmap: RoadmapStep[];
  matchScore?: number;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  resources: string[];
  completed: boolean;
  category: 'education' | 'skill' | 'experience' | 'certification';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: string[];
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'hi';
  voiceEnabled: boolean;
  reducedMotion: boolean;
  privacyMode: boolean;
  notifications: boolean;
  largerText: boolean;
  ttsEnabled: boolean;
  sttEnabled: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'profile' | 'quiz' | 'career' | 'learning';
}

export interface UserProgress {
  profileCompletion: number;
  quizCompletion: number;
  roadmapProgress: Record<string, number>;
  achievements: Achievement[];
  totalPoints: number;
}

// Store interfaces
interface ProfileState {
  profile: Profile | null;
  profileStep: number;
  setProfile: (profile: Profile) => void;
  setProfileStep: (step: number) => void;
  clearProfile: () => void;
}

interface QuizState {
  currentQuiz: QuizResult | null;
  quizProgress: number;
  setQuizResult: (result: QuizResult) => void;
  setQuizProgress: (progress: number) => void;
  clearQuiz: () => void;
}

interface CareerState {
  careers: Career[];
  selectedCareer: Career | null;
  recommendations: Career[];
  setCareers: (careers: Career[]) => void;
  setSelectedCareer: (career: Career | null) => void;
  setRecommendations: (recommendations: Career[]) => void;
  updateRoadmapStep: (careerId: string, stepId: string, completed: boolean) => void;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  toggleChat: () => void;
  clearMessages: () => void;
}

interface SettingsState {
  settings: Settings;
  isOnline: boolean;
  voiceRecognition: boolean;
  currentLanguage: 'en' | 'hi';
  updateSettings: (updates: Partial<Settings>) => void;
  setOnlineStatus: (status: boolean) => void;
  setVoiceRecognition: (active: boolean) => void;
  toggleLanguage: () => void;
  resetSettings: () => void;
}

interface ProgressState {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  addAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  clearProgress: () => void;
}

interface AppState {
  isLoading: boolean;
  error: string | null;
  showQRCode: boolean;
  qrCodeUrl: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setQRCode: (show: boolean, url?: string) => void;
  clearAllData: () => void;
}

// Default values
const defaultSettings: Settings = {
  theme: 'system',
  language: 'en',
  voiceEnabled: false,
  reducedMotion: false,
  privacyMode: false,
  notifications: true,
  largerText: false,
  ttsEnabled: false,
  sttEnabled: false,
};

const defaultProgress: UserProgress = {
  profileCompletion: 0,
  quizCompletion: 0,
  roadmapProgress: {},
  achievements: [],
  totalPoints: 0,
};

// Individual stores
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      profileStep: 0,
      setProfile: (profile) => set({ profile }),
      setProfileStep: (profileStep) => set({ profileStep }),
      clearProfile: () => set({ profile: null, profileStep: 0 }),
    }),
    {
      name: 'nextgen-minds-profile',
    }
  )
);

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuiz: null,
      quizProgress: 0,
      setQuizResult: (currentQuiz) => set({ currentQuiz }),
      setQuizProgress: (quizProgress) => set({ quizProgress }),
      clearQuiz: () => set({ currentQuiz: null, quizProgress: 0 }),
    }),
    {
      name: 'nextgen-minds-quiz',
    }
  )
);

export const useCareerStore = create<CareerState>()(
  persist(
    (set, get) => ({
      careers: [],
      selectedCareer: null,
      recommendations: [],
      setCareers: (careers) => set({ careers }),
      setSelectedCareer: (selectedCareer) => set({ selectedCareer }),
      setRecommendations: (recommendations) => set({ recommendations }),
      updateRoadmapStep: (careerId, stepId, completed) => {
        const { careers, selectedCareer } = get();
        const updatedCareers = careers.map(career => {
          if (career.id === careerId) {
            const updatedRoadmap = career.roadmap.map(step =>
              step.id === stepId ? { ...step, completed } : step
            );
            return { ...career, roadmap: updatedRoadmap };
          }
          return career;
        });
        
        set({ careers: updatedCareers });
        
        if (selectedCareer?.id === careerId) {
          const updatedSelected = updatedCareers.find(c => c.id === careerId);
          set({ selectedCareer: updatedSelected || null });
        }
      },
    }),
    {
      name: 'nextgen-minds-careers',
    }
  )
);

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isOpen: false,
      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set({ messages: [...get().messages, newMessage] });
      },
      toggleChat: () => set({ isOpen: !get().isOpen }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'nextgen-minds-chat',
    }
  )
);

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      isOnline: navigator.onLine,
      voiceRecognition: false,
      currentLanguage: 'en',
      updateSettings: (updates) => set(state => ({
        settings: { ...state.settings, ...updates }
      })),
      setOnlineStatus: (isOnline) => set({ isOnline }),
      setVoiceRecognition: (voiceRecognition) => set({ voiceRecognition }),
      toggleLanguage: () => set(state => {
        const newLanguage = state.currentLanguage === 'en' ? 'hi' : 'en';
        return {
          currentLanguage: newLanguage,
          settings: { ...state.settings, language: newLanguage }
        };
      }),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'nextgen-minds-settings',
    }
  )
);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: defaultProgress,
      updateProgress: (updates) => set(state => ({
        progress: { ...state.progress, ...updates }
      })),
      addAchievement: (achievement) => {
        const newAchievement: Achievement = {
          ...achievement,
          unlockedAt: new Date()
        };
        set(state => ({
          progress: {
            ...state.progress,
            achievements: [...state.progress.achievements, newAchievement],
            totalPoints: state.progress.totalPoints + 100
          }
        }));
      },
      clearProgress: () => set({ progress: defaultProgress }),
    }),
    {
      name: 'nextgen-minds-progress',
    }
  )
);

export const useAppStore = create<AppState>((set, get) => ({
  isLoading: false,
  error: null,
  showQRCode: false,
  qrCodeUrl: '',
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setQRCode: (showQRCode, qrCodeUrl = '') => set({ showQRCode, qrCodeUrl }),
  clearAllData: () => {
    // Clear all stores
    useProfileStore.getState().clearProfile();
    useQuizStore.getState().clearQuiz();
    useCareerStore.getState().setCareers([]);
    useCareerStore.getState().setRecommendations([]);
    useCareerStore.getState().setSelectedCareer(null);
    useChatStore.getState().clearMessages();
    useSettingsStore.getState().resetSettings();
    useProgressStore.getState().clearProgress();
    
    // Clear localStorage
    localStorage.clear();
    
    set({ error: null, isLoading: false, showQRCode: false, qrCodeUrl: '' });
  },
}));