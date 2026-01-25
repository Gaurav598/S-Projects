import { useState, useEffect } from 'react';
import { useSettingsStore } from '../lib/store';

export const useOnlineStatus = () => {
  const { setOnlineStatus } = useSettingsStore();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOnlineStatus(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOnlineStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial status
    setOnlineStatus(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  return isOnline;
};