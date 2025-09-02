import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    learningStyle: 'visual' as const
  });
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) throw error;
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
      }
      onSuccess();
    } catch (error) {
      console.error('Auth error:', error);
      alert(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Join EduMateAI' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Start your personalized learning journey' : 'Continue your learning adventure'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Style
              </label>
              <select
                value={formData.learningStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, learningStyle: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                <option value="visual">Visual Learner</option>
                <option value="auditory">Auditory Learner</option>
                <option value="kinesthetic">Kinesthetic Learner</option>
                <option value="reading">Reading/Writing Learner</option>
              </select>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Processing...</span>
              </div>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Email: demo@edumate.ai</div>
            <div>Password: demo123</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};