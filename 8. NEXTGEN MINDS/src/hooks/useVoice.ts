import { useState, useEffect, useCallback } from 'react';
import { useSettingsStore } from '../lib/store';

interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface UseVoiceReturn {
  isListening: boolean;
  transcript: string;
  confidence: number;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}

export const useVoice = (): UseVoiceReturn => {
  const { settings, setVoiceRecognition } = useSettingsStore();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  useEffect(() => {
    if (!isSupported || !settings.voiceEnabled) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = settings.language === 'hi' ? 'hi-IN' : 'en-US';

    recognitionInstance.onstart = () => {
      setIsListening(true);
      setVoiceRecognition(true);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      setVoiceRecognition(false);
    };

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          setConfidence(result[0].confidence);
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setVoiceRecognition(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, [settings.voiceEnabled, settings.language, isSupported, setVoiceRecognition]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setTranscript('');
      setConfidence(0);
      recognition.start();
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const speak = useCallback((text: string) => {
    if (!settings.ttsEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [settings.ttsEnabled, settings.language]);

  return {
    isListening,
    transcript,
    confidence,
    isSupported,
    startListening,
    stopListening,
    speak,
    isSpeaking
  };
};

// Voice command processing
export const useVoiceCommands = () => {
  const { transcript } = useVoice();

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('go to home') || lowerCommand.includes('home page')) {
      window.location.href = '/';
      return 'Navigating to home page';
    }
    
    if (lowerCommand.includes('take quiz') || lowerCommand.includes('start quiz')) {
      window.location.href = '/quiz';
      return 'Starting career quiz';
    }
    
    if (lowerCommand.includes('show recommendations') || lowerCommand.includes('my recommendations')) {
      window.location.href = '/recommendations';
      return 'Showing your career recommendations';
    }
    
    if (lowerCommand.includes('open settings') || lowerCommand.includes('settings page')) {
      window.location.href = '/settings';
      return 'Opening settings';
    }
    
    // Action commands
    if (lowerCommand.includes('scroll up') || lowerCommand.includes('go up')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return 'Scrolling to top';
    }
    
    if (lowerCommand.includes('scroll down') || lowerCommand.includes('go down')) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return 'Scrolling to bottom';
    }
    
    return null;
  }, []);

  return { processCommand, transcript };
};