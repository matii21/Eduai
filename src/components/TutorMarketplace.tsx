import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  DollarSign, 
  Video, 
  Calendar,
  Shield,
  Award,
  MessageCircle
} from 'lucide-react';

export const TutorMarketplace: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null);

  const subjects = ['all', 'Mathematics', 'Science', 'Literature', 'History', 'Languages'];
  
  const tutors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      subjects: ["Mathematics", "Physics"],
      rating: 4.9,
      totalSessions: 1247,
      hourlyRate: 45,
      bio: "PhD in Mathematics with 10+ years teaching experience. Specializes in calculus and linear algebra.",
      verified: true,
      online: true,
      nextAvailable: "Today 3:00 PM"
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      subjects: ["Literature", "History"],
      rating: 4.8,
      totalSessions: 892,
      hourlyRate: 38,
      bio: "Former university professor with expertise in American literature and world history.",
      verified: true,
      online: false,
      nextAvailable: "Tomorrow 10:00 AM"
    },
    {
      id: 3,
      name: "Emma Thompson",
      subjects: ["Science", "Biology"],
      rating: 4.9,
      totalSessions: 634,
      hourlyRate: 42,
      bio: "Medical student and biology tutor. Makes complex concepts simple and engaging.",
      verified: true,
      online: true,
      nextAvailable: "Today 5:30 PM"
    }
  ];

  const filteredTutors = selectedSubject === 'all' 
    ? tutors 
    : tutors.filter(tutor => tutor.subjects.includes(selectedSubject));

  const bookSession = (tutorId: number) => {
    setSelectedTutor(tutorId);
    // Simulate Stripe payment flow
    setTimeout(() => {
      alert('🎉 Session booked successfully! Payment processed via Stripe.');
      setSelectedTutor(null);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Users className="w-8 h-8 text-indigo-600" />
          <span>Find Your Perfect Tutor</span>
        </h2>
        
        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <motion.button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedSubject === subject
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subject === 'all' ? 'All Subjects' : subject}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tutor, index) => (
          <motion.div
            key={tutor.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Tutor Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {tutor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-1">
                    <span>{tutor.name}</span>
                    {tutor.verified && <Shield className="w-4 h-4 text-green-500" />}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{tutor.rating}</span>
                    <span className="text-sm text-gray-400">({tutor.totalSessions} sessions)</span>
                  </div>
                </div>
              </div>
              
              <div className={`w-3 h-3 rounded-full ${tutor.online ? 'bg-green-400' : 'bg-gray-300'}`} />
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-1 mb-3">
              {tutor.subjects.map((subject) => (
                <span
                  key={subject}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {tutor.bio}
            </p>

            {/* Pricing & Availability */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${tutor.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{tutor.nextAvailable}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <motion.button
                onClick={() => bookSession(tutor.id)}
                disabled={selectedTutor === tutor.id}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  selectedTutor === tutor.id
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                }`}
                whileHover={selectedTutor !== tutor.id ? { scale: 1.02 } : {}}
                whileTap={selectedTutor !== tutor.id ? { scale: 0.98 } : {}}
              >
                {selectedTutor === tutor.id ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Session</span>
                  </div>
                )}
              </motion.button>
              
              <div className="flex space-x-2">
                <motion.button
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </motion.button>
                
                <motion.button
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Video className="w-4 h-4" />
                  <span>Preview</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marketplace Stats */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🌟 Marketplace Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">500+</div>
            <div className="text-sm text-gray-600">Verified Tutors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-gray-600">Subjects Covered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">4.8★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};