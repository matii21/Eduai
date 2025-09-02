import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Clock,
  Shield,
  Mic,
  Volume2,
  Eye,
  Wifi,
  WifiOff
} from 'lucide-react';
import { StudyMaterialUpload } from './StudyMaterialUpload';
import { FlashcardPractice } from './FlashcardPractice';
import { TutorMarketplace } from './TutorMarketplace';
import { CertificateGallery } from './CertificateGallery';
import { ProgressDashboard } from './ProgressDashboard';
import { AntiCheatDemo } from './AntiCheatDemo';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const tabs = [
    { id: 'upload', label: 'Upload Materials', icon: Upload },
    { id: 'study', label: 'Study Session', icon: BookOpen },
    { id: 'tutors', label: 'Find Tutors', icon: Users },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'anti-cheat', label: 'Patronus Mode', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return <StudyMaterialUpload />;
      case 'study':
        return <FlashcardPractice />;
      case 'tutors':
        return <TutorMarketplace />;
      case 'certificates':
        return <CertificateGallery />;
      case 'progress':
        return <ProgressDashboard />;
      case 'anti-cheat':
        return <AntiCheatDemo />;
      default:
        return <StudyMaterialUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.div 
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
              animate={{ scale: isOnline ? 1 : [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                speechEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {speechEnabled ? <Volume2 className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};