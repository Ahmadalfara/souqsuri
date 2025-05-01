
import React from 'react';
import { Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from './ArabicText';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message }: LoadingScreenProps) => {
  const { language, t } = useLanguage();
  const defaultMessage = language === 'ar' ? 'جاري التحميل...' : 'Loading...';
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="animate-spin mb-4">
        <Loader size={40} className="text-syrian-green" />
      </div>
      <p className="text-xl font-medium text-syrian-dark">
        {language === 'ar' ? (
          <ArabicText text={message || defaultMessage} />
        ) : (
          message || defaultMessage
        )}
      </p>
    </div>
  );
};

export default LoadingScreen;
