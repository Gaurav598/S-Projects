import { openDB, type IDBPDatabase } from 'idb';
import type { Profile, QuizResult, ChatMessage, Settings, Career } from './store';

interface NextGenMindsDB {
  profiles: {
    key: string;
    value: Profile;
  };
  quizResults: {
    key: string;
    value: QuizResult;
  };
  careers: {
    key: string;
    value: Career;
  };
  chatHistory: {
    key: string;
    value: ChatMessage;
  };
  settings: {
    key: string;
    value: Settings;
  };
  backups: {
    key: string;
    value: {
      timestamp: Date;
      data: string;
    };
  };
}

let db: IDBPDatabase<NextGenMindsDB> | null = null;

export const initDB = async () => {
  if (db) return db;

  try {
    db = await openDB<NextGenMindsDB>('NextGenMindsDB', 1, {
      upgrade(db) {
        // Create object stores
        if (!db.objectStoreNames.contains('profiles')) {
          db.createObjectStore('profiles', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('quizResults')) {
          db.createObjectStore('quizResults', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('careers')) {
          db.createObjectStore('careers', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('chatHistory')) {
          const chatStore = db.createObjectStore('chatHistory', { keyPath: 'id' });
          chatStore.createIndex('timestamp', 'timestamp');
        }
        
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('backups')) {
          const backupStore = db.createObjectStore('backups', { keyPath: 'id' });
          backupStore.createIndex('timestamp', 'timestamp');
        }
      },
    });

    console.log('NextGen Minds IndexedDB initialized successfully');
    return db;
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
    return null;
  }
};

// Profile operations
export const saveProfile = async (profile: Profile) => {
  const database = await initDB();
  if (!database) return false;

  try {
    await database.put('profiles', { ...profile, id: 'current' });
    return true;
  } catch (error) {
    console.error('Failed to save profile:', error);
    return false;
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  const database = await initDB();
  if (!database) return null;

  try {
    const result = await database.get('profiles', 'current');
    return result || null;
  } catch (error) {
    console.error('Failed to get profile:', error);
    return null;
  }
};

// Quiz operations
export const saveQuizResult = async (quizResult: QuizResult) => {
  const database = await initDB();
  if (!database) return false;

  try {
    await database.put('quizResults', { ...quizResult, id: 'current' });
    return true;
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return false;
  }
};

export const getQuizResult = async (): Promise<QuizResult | null> => {
  const database = await initDB();
  if (!database) return null;

  try {
    const result = await database.get('quizResults', 'current');
    return result || null;
  } catch (error) {
    console.error('Failed to get quiz result:', error);
    return null;
  }
};

// Career operations
export const saveCareers = async (careers: Career[]) => {
  const database = await initDB();
  if (!database) return false;

  try {
    const tx = database.transaction('careers', 'readwrite');
    await Promise.all(careers.map(career => tx.store.put(career)));
    await tx.done;
    return true;
  } catch (error) {
    console.error('Failed to save careers:', error);
    return false;
  }
};

export const getCareers = async (): Promise<Career[]> => {
  const database = await initDB();
  if (!database) return [];

  try {
    const careers = await database.getAll('careers');
    return careers;
  } catch (error) {
    console.error('Failed to get careers:', error);
    return [];
  }
};

// Chat operations
export const saveChatMessage = async (message: ChatMessage) => {
  const database = await initDB();
  if (!database) return false;

  try {
    await database.put('chatHistory', message);
    return true;
  } catch (error) {
    console.error('Failed to save chat message:', error);
    return false;
  }
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
  const database = await initDB();
  if (!database) return [];

  try {
    const messages = await database.getAll('chatHistory');
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  } catch (error) {
    console.error('Failed to get chat history:', error);
    return [];
  }
};

export const clearChatHistory = async () => {
  const database = await initDB();
  if (!database) return false;

  try {
    await database.clear('chatHistory');
    return true;
  } catch (error) {
    console.error('Failed to clear chat history:', error);
    return false;
  }
};

// Settings operations
export const saveSettings = async (settings: Settings) => {
  const database = await initDB();
  if (!database) return false;

  try {
    await database.put('settings', { ...settings, id: 'current' });
    return true;
  } catch (error) {
    console.error('Failed to save settings:', error);
    return false;
  }
};

export const getSettings = async (): Promise<Settings | null> => {
  const database = await initDB();
  if (!database) return null;

  try {
    const result = await database.get('settings', 'current');
    return result || null;
  } catch (error) {
    console.error('Failed to get settings:', error);
    return null;
  }
};

// Backup operations
export const createBackup = async () => {
  const database = await initDB();
  if (!database) return null;

  try {
    const [profile, quizResult, careers, chatHistory, settings] = await Promise.all([
      getProfile(),
      getQuizResult(),
      getCareers(),
      getChatHistory(),
      getSettings(),
    ]);

    const backup = {
      profile,
      quizResult,
      careers,
      chatHistory,
      settings,
      exportedAt: new Date().toISOString(),
    };

    const backupData = {
      id: `backup_${Date.now()}`,
      timestamp: new Date(),
      data: JSON.stringify(backup, null, 2),
    };

    await database.put('backups', backupData);

    return backup;
  } catch (error) {
    console.error('Failed to create backup:', error);
    return null;
  }
};

export const exportData = async () => {
  const backup = await createBackup();
  if (!backup) return null;

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `career-advisor-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return backup;
};

export const importData = async (file: File): Promise<boolean> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    // Validate data structure
    if (!data.exportedAt) {
      throw new Error('Invalid backup file format');
    }

    // Import data
    if (data.profile) await saveProfile(data.profile);
    if (data.quizResult) await saveQuizResult(data.quizResult);
    if (data.careers) await saveCareers(data.careers);
    if (data.settings) await saveSettings(data.settings);
    
    // Import chat history
    if (data.chatHistory && Array.isArray(data.chatHistory)) {
      const database = await initDB();
      if (database) {
        const tx = database.transaction('chatHistory', 'readwrite');
        await Promise.all(data.chatHistory.map((msg: ChatMessage) => tx.store.put(msg)));
        await tx.done;
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};

// Clear all data
export const clearAllData = async () => {
  const database = await initDB();
  if (!database) return false;

  try {
    await Promise.all([
      database.clear('profiles'),
      database.clear('quizResults'),
      database.clear('careers'),
      database.clear('chatHistory'),
      database.clear('settings'),
    ]);
    return true;
  } catch (error) {
    console.error('Failed to clear all data:', error);
    return false;
  }
};