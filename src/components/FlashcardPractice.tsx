import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Volume2, CheckCircle, XCircle, Brain, Target } from 'lucide-react';

export const FlashcardPractice: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const flashcards = [
    {
      id: 1,
      question: "What is the process by which plants convert sunlight into energy?",
      answer: "Photosynthesis - the process where plants use chlorophyll to convert sunlight, carbon dioxide, and water into glucose and oxygen.",
      difficulty: "medium",
      subject: "Biology"
    },
    {
      id: 2,
      question: "What is the formula for calculating the area of a circle?",
      answer: "A = πr² where A is the area, π (pi) is approximately 3.14159, and r is the radius of the circle.",
      difficulty: "easy",
      subject: "Mathematics"
    },
    {
      id: 3,
      question: "Who wrote the novel '1984' and what is its main theme?",
      answer: "George Orwell wrote '1984'. The main theme is totalitarianism and the dangers of government surveillance and control over individual freedom.",
      difficulty: "hard",
      subject: "Literature"
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    setTimeout(() => {
      if (currentCard < flashcards.length - 1) {
        setCurrentCard(prev => prev + 1);
        setIsFlipped(false);
      }
    }, 1000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const resetPractice = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setScore({ correct: 0, total: 0 });
  };

  const currentFlashcard = flashcards[currentCard];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span>Flashcard Practice</span>
          </h2>
          <motion.button
            onClick={resetPractice}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Card {currentCard + 1} of {flashcards.length}
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">
                Score: {score.correct}/{score.total}
              </span>
            </div>
          </div>
          
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-full max-w-2xl h-80"
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of card */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center p-8"
                 style={{ backfaceVisibility: 'hidden' }}>
              <div className="text-center">
                <div className="text-white text-lg mb-4 opacity-80">
                  {currentFlashcard.subject} • {currentFlashcard.difficulty}
                </div>
                <h3 className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
                  {currentFlashcard.question}
                </h3>
                <div className="mt-6 text-white opacity-60 text-sm">
                  Click to reveal answer
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center p-8"
                 style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="text-center">
                <h3 className="text-white text-lg md:text-xl leading-relaxed mb-4">
                  {currentFlashcard.answer}
                </h3>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(currentFlashcard.answer);
                  }}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Answer Buttons */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.button
              onClick={() => handleAnswer(false)}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <XCircle className="w-5 h-5" />
              <span>Incorrect</span>
            </motion.button>
            
            <motion.button
              onClick={() => handleAnswer(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Correct</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          💡 Study Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• Use the audio feature to engage auditory learning</div>
          <div>• Mark difficult cards for extra review sessions</div>
          <div>• Take breaks every 25 minutes (Pomodoro technique)</div>
          <div>• Review cards before bed for better retention</div>
        </div>
      </div>
    </div>
  );
};