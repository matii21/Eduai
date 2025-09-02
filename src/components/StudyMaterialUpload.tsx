import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Mic, Image, Zap, CheckCircle } from 'lucide-react';

export const StudyMaterialUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedContent, setProcessedContent] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newContent = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        type: file.type.includes('image') ? 'image' : 
              file.type.includes('audio') ? 'audio' : 
              file.type.includes('pdf') ? 'pdf' : 'text',
        flashcards: Math.floor(Math.random() * 20) + 5,
        quizzes: Math.floor(Math.random() * 5) + 2,
        studyTime: Math.floor(Math.random() * 60) + 15
      }));
      
      setProcessedContent(prev => [...prev, ...newContent]);
      setIsProcessing(false);
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ y: isDragActive ? -10 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isDragActive ? 'Drop your files here!' : 'Upload Study Materials'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag & drop or click to upload PDFs, audio recordings, images, or text files
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>PDF/Text</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mic className="w-4 h-4" />
              <span>Audio</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image className="w-4 h-4" />
              <span>Images</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Processing Your Materials
              </h3>
              <p className="text-gray-600">
                Analyzing content and generating personalized learning materials...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processed Content */}
      {processedContent.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span>Generated Learning Materials</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedContent.map((content, index) => (
              <motion.div
                key={content.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    {content.type === 'pdf' && <FileText className="w-5 h-5 text-indigo-600" />}
                    {content.type === 'audio' && <Mic className="w-5 h-5 text-indigo-600" />}
                    {content.type === 'image' && <Image className="w-5 h-5 text-indigo-600" />}
                    {content.type === 'text' && <FileText className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 truncate">
                      {content.fileName}
                    </h4>
                    <p className="text-sm text-gray-500 capitalize">{content.type}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Flashcards</span>
                    <span className="font-semibold text-indigo-600">{content.flashcards}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quizzes</span>
                    <span className="font-semibold text-purple-600">{content.quizzes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Est. Study Time</span>
                    <span className="font-semibold text-green-600">{content.studyTime}m</span>
                  </div>
                </div>
                
                <motion.button
                  className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Studying
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Demo Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg"
          whileHover={{ y: -5 }}
        >
          <Zap className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Instant AI Processing
          </h3>
          <p className="text-gray-600 text-sm">
            Our advanced AI instantly converts your materials into optimized learning content
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg"
          whileHover={{ y: -5 }}
        >
          <Clock className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Spaced Repetition
          </h3>
          <p className="text-gray-600 text-sm">
            Science-backed scheduling ensures you review content at optimal intervals
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg"
          whileHover={{ y: -5 }}
        >
          <Shield className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Academic Integrity
          </h3>
          <p className="text-gray-600 text-sm">
            Patronus Mode ensures honest learning with real-time monitoring
          </p>
        </motion.div>
      </div>
    </div>
  );
};