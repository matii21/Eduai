import React from 'react';
import { motion } from 'framer-motion';
import { Brain, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduMateAI
            </h1>
          </motion.div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
              <motion.button
                onClick={signOut}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};