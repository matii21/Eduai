import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Flame, 
  Trophy,
  Calendar,
  BarChart3,
  Brain
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const stats = {
    studyStreak: 12,
    totalStudyTime: 47.5,
    cardsReviewed: 234,
    quizzesTaken: 18,
    averageScore: 87,
    weeklyGoal: 75,
    weeklyProgress: 68
  };

  const recentActivity = [
    { date: '2024-01-15', activity: 'Completed Biology Quiz', score: 92, time: '15 min' },
    { date: '2024-01-15', activity: 'Reviewed Math Flashcards', score: 85, time: '22 min' },
    { date: '2024-01-14', activity: 'Tutor Session: Chemistry', score: 95, time: '60 min' },
    { date: '2024-01-14', activity: 'Physics Problem Set', score: 78, time: '35 min' },
  ];

  const subjects = [
    { name: 'Mathematics', progress: 85, color: 'bg-blue-500' },
    { name: 'Biology', progress: 92, color: 'bg-green-500' },
    { name: 'Chemistry', progress: 78, color: 'bg-purple-500' },
    { name: 'Physics', progress: 71, color: 'bg-red-500' },
    { name: 'Literature', progress: 89, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-8 h-8" />
            <span className="text-2xl font-bold">{stats.studyStreak}</span>
          </div>
          <h3 className="font-semibold">Study Streak</h3>
          <p className="text-orange-100 text-sm">Days in a row</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8" />
            <span className="text-2xl font-bold">{stats.totalStudyTime}h</span>
          </div>
          <h3 className="font-semibold">Total Study Time</h3>
          <p className="text-blue-100 text-sm">This month</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8" />
            <span className="text-2xl font-bold">{stats.averageScore}%</span>
          </div>
          <h3 className="font-semibold">Average Score</h3>
          <p className="text-green-100 text-sm">Last 30 days</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8" />
            <span className="text-2xl font-bold">{stats.cardsReviewed}</span>
          </div>
          <h3 className="font-semibold">Cards Reviewed</h3>
          <p className="text-purple-100 text-sm">This week</p>
        </motion.div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <span>Weekly Goal Progress</span>
          </h3>
          <span className="text-sm text-gray-600">
            {stats.weeklyProgress}% of {stats.weeklyGoal}h goal
          </span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0h</span>
            <span>{stats.weeklyProgress}h</span>
            <span>{stats.weeklyGoal}h</span>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Brain className="w-6 h-6 text-indigo-600" />
          <span>Subject Mastery</span>
        </h3>
        
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-24 text-sm font-medium text-gray-700">
                {subject.name}
              </div>
              <div className="flex-1 relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full ${subject.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-900">
                {subject.progress}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <span>Recent Activity</span>
        </h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.score >= 90 ? 'bg-green-400' :
                  activity.score >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="font-medium text-gray-900">{activity.activity}</div>
                  <div className="text-sm text-gray-500">{activity.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{activity.score}%</div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>Recent Achievements</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {['Study Streak Master', 'Quiz Champion', 'Fast Learner', 'Consistency King'].map((badge, index) => (
            <motion.div
              key={badge}
              className="bg-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{badge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};