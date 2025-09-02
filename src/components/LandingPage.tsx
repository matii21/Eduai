import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, Zap, Users, Shield, Award, Accessibility, Globe } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Transform any study material into personalized flashcards, quizzes, and learning paths"
    },
    {
      icon: Upload,
      title: "Multi-Format Support",
      description: "Upload text, PDFs, voice memos, or images - our AI understands them all"
    },
    {
      icon: Zap,
      title: "Spaced Repetition",
      description: "Science-backed algorithms optimize your review schedule for maximum retention"
    },
    {
      icon: Users,
      title: "Tutor Marketplace",
      description: "Connect with verified tutors for live sessions with integrated payments"
    },
    {
      icon: Shield,
      title: "Anti-Cheat Protection",
      description: "Patronus Mode ensures academic integrity with real-time monitoring"
    },
    {
      icon: Award,
      title: "Blockchain Certificates",
      description: "Earn verifiable credentials and NFT badges for your achievements"
    },
    {
      icon: Accessibility,
      title: "Inclusive Design",
      description: "WCAG 2.1 AA compliant with text-to-speech and visual accessibility"
    },
    {
      icon: Globe,
      title: "Offline-First PWA",
      description: "Study anywhere, anytime - even without internet connection"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Brain className="w-20 h-20 text-indigo-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                EduMateAI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your AI study companion that learns how you learn. Transform any material into 
              personalized learning experiences with multi-sensory support.
            </p>
            
            <motion.button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Now
            </motion.button>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Upload className="w-12 h-12 text-indigo-400" />
          </motion.div>
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Award className="w-16 h-16 text-purple-400" />
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionizing Education with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Supporting SDG 4: Quality Education through innovative technology and inclusive design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Demo Preview */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See EduMateAI in Action
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of personalized learning
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Upload & Transform
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                    <p className="text-gray-600">Drop your study materials here</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    ✓ PDF documents<br />
                    ✓ Voice recordings<br />
                    ✓ Handwritten notes<br />
                    ✓ Text files
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI-Generated Content
                </h3>
                <div className="space-y-3">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-900">Flashcard Generated</h4>
                    <p className="text-sm text-indigo-700">What is photosynthesis?</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Quiz Created</h4>
                    <p className="text-sm text-purple-700">5 questions ready for practice</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Study Plan</h4>
                    <p className="text-sm text-green-700">Optimized review schedule created</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div
                className="text-4xl font-bold text-indigo-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                1.6B
              </motion.div>
              <p className="text-gray-600">Students Worldwide Need Better Education</p>
            </div>
            <div>
              <motion.div
                className="text-4xl font-bold text-purple-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                85%
              </motion.div>
              <p className="text-gray-600">Improvement in Retention with Spaced Repetition</p>
            </div>
            <div>
              <motion.div
                className="text-4xl font-bold text-pink-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                24/7
              </motion.div>
              <p className="text-gray-600">AI Tutor Availability</p>
            </div>
            <div>
              <motion.div
                className="text-4xl font-bold text-green-600 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                100%
              </motion.div>
              <p className="text-gray-600">Accessible Design Compliance</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};