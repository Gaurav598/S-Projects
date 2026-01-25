import type { ChatMessage } from './store';

// Backend API integration
interface BackendChatRequest {
  model_name: string;
  model_provider: string;
  system_prompt: string;
  messages: string[];
  allow_search: boolean;
}

const BACKEND_API_URL = 'http://127.0.0.1:9999/chat';

// Backend API call function
const callBackendAPI = async (userMessage: string): Promise<string> => {
  try {
    const requestBody: BackendChatRequest = {
      model_name: "gpt-4o-mini",
      model_provider: "OpenAI",
      system_prompt: "You are a helpful NextGen Minds career guidance assistant. Help users with career recommendations, roadmaps, scholarships, and answer questions about their career journey.",
      messages: [userMessage],
      allow_search: false
    };

    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    // The backend returns a plain string response
    return result.replace(/^"|"$/g, ''); // Remove surrounding quotes if present
  } catch (error) {
    console.error('Backend API error:', error);
    // Fallback to local FAQ system if backend is unavailable
    throw error;
  }
};

// FAQ data structure
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

// Load FAQ data (placeholder function)
const loadFAQData = async (): Promise<FAQItem[]> => {
  try {
    const response = await fetch('/data/chatbot_faq.json');
    if (!response.ok) {
      throw new Error('Failed to load FAQ data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading FAQ:', error);
    // Fallback FAQ data
    return [
      {
        id: '1',
        question: 'How does the career assessment work?',
        answer: 'Our career assessment analyzes your interests, skills, values, and personality to provide personalized career recommendations. It takes about 10-15 minutes to complete.',
        category: 'assessment',
        keywords: ['career', 'assessment', 'test', 'evaluation', 'how']
      },
      {
        id: '2',
        question: 'Can I retake the quiz?',
        answer: 'Yes! You can retake the career quiz at any time. Your previous results will be saved, and you can compare different assessments.',
        category: 'quiz',
        keywords: ['retake', 'quiz', 'again', 'repeat', 'test']
      },
      {
        id: '3',
        question: 'How accurate are the career recommendations?',
        answer: 'Our recommendations are based on validated career assessment models and industry data. While they provide excellent guidance, we encourage you to explore multiple careers and speak with professionals in your areas of interest.',
        category: 'recommendations',
        keywords: ['accurate', 'recommendations', 'reliable', 'trust']
      },
      {
        id: '4',
        question: 'What if I don\'t like any of my recommended careers?',
        answer: 'That\'s perfectly fine! Career exploration is a journey. You can retake the assessment, explore the full career database, or use the chat to discuss your concerns and preferences.',
        category: 'recommendations',
        keywords: ['don\'t like', 'not interested', 'different', 'other options']
      },
      {
        id: '5',
        question: 'Is my data private and secure?',
        answer: 'Yes, your privacy is our priority. All data is stored locally in your browser and can be deleted at any time. We don\'t share your personal information with third parties.',
        category: 'privacy',
        keywords: ['privacy', 'secure', 'data', 'safe', 'confidential']
      }
    ];
  }
};

// Simple keyword matching for FAQ
const findBestFAQMatch = (query: string, faqs: FAQItem[]): FAQItem | null => {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/).filter(word => word.length > 2);
  
  let bestMatch: FAQItem | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    
    // Check question match
    if (faq.question.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // Check keyword matches
    for (const keyword of faq.keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 5;
      }
    }
    
    // Check individual word matches
    for (const word of words) {
      if (faq.keywords.some(keyword => keyword.toLowerCase().includes(word)) ||
          faq.question.toLowerCase().includes(word)) {
        score += 1;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestScore > 2 ? bestMatch : null;
};

// Generate contextual responses
const generateContextualResponse = (query: string): string => {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('hey')) {
    return "Hello! I'm your NextGen Minds assistant. I can help you with career recommendations, roadmaps, scholarships, and answer questions about your career journey. How can I assist you today?";
  }
  
  if (queryLower.includes('help') || queryLower.includes('stuck')) {
    return "I'm here to help! You can ask me about:\n• Career recommendations and roadmaps\n• Scholarship opportunities\n• Taking or retaking the career assessment\n• Exporting your career plan\n• General career advice\n\nWhat specific area would you like help with?";
  }
  
  if (queryLower.includes('roadmap')) {
    return "I can help you with career roadmaps! Each recommended career comes with a detailed step-by-step roadmap including education, skills, experience, and certifications. Would you like me to show you the roadmap for a specific career?";
  }
  
  if (queryLower.includes('scholarship')) {
    return "Great question about scholarships! I can help you find relevant scholarship opportunities based on your profile and career interests. Let me know your field of interest and I'll provide some options.";
  }
  
  if (queryLower.includes('export') || queryLower.includes('download')) {
    return "You can export your complete career plan including your profile, quiz results, and progress. This creates a downloadable backup of all your data. Would you like me to help you export your plan?";
  }

  return "I'm not sure I understand that question. Could you please rephrase it or ask about career recommendations, roadmaps, scholarships, or taking the assessment?";
};

// Main bot response function
export const sendMessageToBot = async (message: string): Promise<string> => {
  try {
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Try backend API first
    try {
      const backendResponse = await callBackendAPI(message);
      return backendResponse;
    } catch (backendError) {
      console.warn('Backend API unavailable, falling back to local FAQ system:', backendError);
      
      // Fallback to local FAQ system
      const faqs = await loadFAQData();
      
      // Try to find FAQ match first
      const faqMatch = findBestFAQMatch(message, faqs);
      if (faqMatch) {
        return faqMatch.answer;
      }
      
      // Generate contextual response as final fallback
      const contextualResponse = generateContextualResponse(message);
      return contextualResponse;
    }
    
  } catch (error) {
    console.error('Error in bot response:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again or ask a different question.";
  }
};

// Quick action handlers
export const handleQuickAction = async (action: string): Promise<string> => {
  // Try backend API for quick actions too
  try {
    const backendResponse = await callBackendAPI(action);
    return backendResponse;
  } catch (backendError) {
    console.warn('Backend API unavailable for quick action, using local handler:', backendError);
  }
  
  // Fallback to local quick action handling
  switch (action) {
    case 'Show Roadmap':
      return "To view detailed career roadmaps, please visit the Recommendations page where you can see step-by-step paths for each suggested career, including timelines and resources.";
    
    case 'Scholarships':
      return "I can help you find scholarships! Based on your profile, I'll look for relevant opportunities. What field are you most interested in pursuing?";
    
    case 'Export Plan':
      return "You can export your complete career plan from the Settings page. This includes your profile, quiz results, recommendations, and progress. The export will be saved as a JSON file that you can import later.";
    
    case 'Take Quiz':
      return "Ready to discover your ideal career path? Head over to the Quiz section to take our comprehensive career assessment. It only takes about 10-15 minutes!";
    
    case 'Resources':
      return "Check out the Resources section for learning materials, courses, and tools related to your recommended careers. Each career roadmap also includes specific resources for each step.";
    
    default:
      return "I'm not sure how to help with that action. Could you please be more specific about what you'd like to do?";
  }
};

// TODO: Integration points for advanced features
/*
  FUTURE INTEGRATIONS:
  
  1. OpenAI/ChatGPT API Integration:
     - Replace sendMessageToBot with actual API calls
     - Add conversation context management
     - Implement streaming responses for better UX
  
  2. Career API Integration:
     - Connect to job market APIs (Indeed, LinkedIn, etc.)
     - Real-time salary data
     - Job availability in user's location
  
  3. Scholarship API Integration:
     - Connect to scholarship databases
     - Filter by user profile and preferences
     - Application deadline notifications
  
  4. Voice Integration:
     - Web Speech API for voice input
     - Text-to-speech for bot responses
     - Voice-controlled navigation
  
  Example OpenAI integration:
  
  export const sendMessageToAI = async (message: string, context: ChatMessage[]): Promise<string> => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        context: context.slice(-5), // Last 5 messages for context
        userProfile: getCurrentUserProfile(),
        recommendations: getCurrentRecommendations()
      })
    });
    
    const data = await response.json();
    return data.message;
  };
*/