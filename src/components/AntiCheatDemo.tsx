import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Mic, 
  Monitor, 
  AlertTriangle,
  CheckCircle,
  Camera,
  Volume2
} from 'lucide-react';

export const AntiCheatDemo: React.FC = () => {
  const [isPatronusActive, setIsPatronusActive] = useState(false);
  const [integrityScore, setIntegrityScore] = useState(100);
  const [violations, setViolations] = useState<string[]>([]);
  const [monitoring, setMonitoring] = useState({
    camera: false,
    microphone: false,
    screen: false,
    browser: false
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPatronusActive) {
      interval = setInterval(() => {
        // Simulate random integrity checks
        const randomCheck = Math.random();
        if (randomCheck < 0.1) { // 10% chance of violation
          const possibleViolations = [
            'Multiple browser tabs detected',
            'External application opened',
            'Suspicious mouse movement pattern',
            'Audio input detected',
            'Screen sharing detected'
          ];
          const violation = possibleViolations[Math.floor(Math.random() * possibleViolations.length)];
          setViolations(prev => [...prev, violation]);
          setIntegrityScore(prev => Math.max(prev - 5, 0));
        }
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPatronusActive]);

  const startPatronusMode = async () => {
    setIsPatronusActive(true);
    setViolations([]);
    setIntegrityScore(100);
    
    // Simulate enabling monitoring systems
    setTimeout(() => setMonitoring(prev => ({ ...prev, camera: true })), 500);
    setTimeout(() => setMonitoring(prev => ({ ...prev, microphone: true })), 1000);
    setTimeout(() => setMonitoring(prev => ({ ...prev, screen: true })), 1500);
    setTimeout(() => setMonitoring(prev => ({ ...prev, browser: true })), 2000);
  };

  const stopPatronusMode = () => {
    setIsPatronusActive(false);
    setMonitoring({ camera: false, microphone: false, screen: false, browser: false });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <Shield className="w-8 h-8 text-red-600" />
              <span>Patronus Anti-Cheat Mode</span>
            </h2>
            <p className="text-gray-600">
              Advanced AI monitoring ensures academic integrity during assessments
            </p>
          </div>
          
          <motion.button
            onClick={isPatronusActive ? stopPatronusMode : startPatronusMode}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              isPatronusActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-5 h-5" />
            <span>{isPatronusActive ? 'Stop Monitoring' : 'Start Patronus Mode'}</span>
          </motion.button>
        </div>
      </div>

      {/* Monitoring Status */}
      {isPatronusActive && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-red-800 font-semibold">PATRONUS MODE ACTIVE</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              monitoring.camera ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Camera</span>
              {monitoring.camera && <CheckCircle className="w-4 h-4" />}
            </div>
            
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              monitoring.microphone ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <Mic className="w-5 h-5" />
              <span className="text-sm font-medium">Microphone</span>
              {monitoring.microphone && <CheckCircle className="w-4 h-4" />}
            </div>
            
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              monitoring.screen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <Monitor className="w-5 h-5" />
              <span className="text-sm font-medium">Screen</span>
              {monitoring.screen && <CheckCircle className="w-4 h-4" />}
            </div>
            
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              monitoring.browser ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <Eye className="w-5 h-5" />
              <span className="text-sm font-medium">Browser</span>
              {monitoring.browser && <CheckCircle className="w-4 h-4" />}
            </div>
          </div>
        </motion.div>
      )}

      {/* Integrity Score */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Target className="w-6 h-6 text-indigo-600" />
          <span>Integrity Score</span>
        </h3>
        
        <div className="relative mb-6">
          <div className="w-full bg-gray-200 rounded-full h-6">
            <motion.div
              className={`h-6 rounded-full transition-all duration-500 ${
                integrityScore >= 80 ? 'bg-green-500' :
                integrityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: '100%' }}
              animate={{ width: `${integrityScore}%` }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{integrityScore}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className={`p-4 rounded-lg ${integrityScore >= 90 ? 'bg-green-50' : 'bg-gray-50'}`}>
            <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${integrityScore >= 90 ? 'text-green-500' : 'text-gray-400'}`} />
            <div className="font-semibold text-gray-900">Excellent</div>
            <div className="text-sm text-gray-600">90-100%</div>
          </div>
          
          <div className={`p-4 rounded-lg ${integrityScore >= 70 && integrityScore < 90 ? 'bg-yellow-50' : 'bg-gray-50'}`}>
            <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${integrityScore >= 70 && integrityScore < 90 ? 'text-yellow-500' : 'text-gray-400'}`} />
            <div className="font-semibold text-gray-900">Warning</div>
            <div className="text-sm text-gray-600">70-89%</div>
          </div>
          
          <div className={`p-4 rounded-lg ${integrityScore < 70 ? 'bg-red-50' : 'bg-gray-50'}`}>
            <XCircle className={`w-8 h-8 mx-auto mb-2 ${integrityScore < 70 ? 'text-red-500' : 'text-gray-400'}`} />
            <div className="font-semibold text-gray-900">Critical</div>
            <div className="text-sm text-gray-600">Below 70%</div>
          </div>
        </div>
      </div>

      {/* Violations Log */}
      {violations.length > 0 && (
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span>Security Alerts</span>
          </h3>
          
          <div className="space-y-3">
            {violations.map((violation, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-800 font-medium">{violation}</span>
                <span className="text-red-600 text-sm ml-auto">
                  {new Date().toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* How It Works */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🛡️ How Patronus Mode Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Real-time Monitoring</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Eye tracking and gaze analysis</li>
              <li>• Audio environment monitoring</li>
              <li>• Screen sharing detection</li>
              <li>• Browser tab switching alerts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Behavioral pattern recognition</li>
              <li>• Keystroke dynamics analysis</li>
              <li>• Response time evaluation</li>
              <li>• Confidence scoring algorithms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};