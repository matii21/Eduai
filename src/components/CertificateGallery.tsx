import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, ExternalLink, Sparkles, Shield } from 'lucide-react';

export const CertificateGallery: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      title: "Advanced Mathematics Mastery",
      description: "Completed comprehensive calculus and linear algebra course",
      issueDate: "2024-01-15",
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      nftTokenId: "EDU-MATH-001",
      level: "Advanced",
      creditsEarned: 120,
      verified: true
    },
    {
      id: 2,
      title: "Biology Fundamentals",
      description: "Mastered cellular biology and genetics principles",
      issueDate: "2024-01-10",
      blockchainHash: "0x9876543210fedcba0987654321abcdef",
      nftTokenId: "EDU-BIO-002",
      level: "Intermediate",
      creditsEarned: 80,
      verified: true
    },
    {
      id: 3,
      title: "Critical Thinking Excellence",
      description: "Demonstrated advanced analytical and reasoning skills",
      issueDate: "2024-01-05",
      blockchainHash: "0xabcdef1234567890fedcba0987654321",
      nftTokenId: "EDU-THINK-003",
      level: "Expert",
      creditsEarned: 150,
      verified: true
    }
  ];

  const generateNewCertificate = () => {
    const newCert = {
      id: Date.now(),
      title: "AI Learning Pioneer",
      description: "Successfully completed EduMateAI platform demonstration",
      issueDate: new Date().toISOString().split('T')[0],
      blockchainHash: `0x${Math.random().toString(16).substr(2, 32)}`,
      nftTokenId: `EDU-DEMO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      level: "Beginner",
      creditsEarned: 25,
      verified: true
    };
    
    // Simulate blockchain verification
    setTimeout(() => {
      alert(`🎉 New certificate issued!\nNFT Token: ${newCert.nftTokenId}\nBlockchain Hash: ${newCert.blockchainHash}`);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <Award className="w-8 h-8 text-indigo-600" />
              <span>Your Certificates</span>
            </h2>
            <p className="text-gray-600">
              Blockchain-verified credentials that prove your achievements
            </p>
          </div>
          
          <motion.button
            onClick={generateNewCertificate}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Demo Certificate</span>
          </motion.button>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl p-1 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="bg-white rounded-lg p-6 h-full">
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-indigo-600" />
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    cert.level === 'Expert' ? 'bg-red-100 text-red-700' :
                    cert.level === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                    cert.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {cert.level}
                  </span>
                </div>
                {cert.verified && (
                  <Shield className="w-5 h-5 text-green-500" />
                )}
              </div>

              {/* Certificate Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {cert.description}
              </p>

              {/* Certificate Details */}
              <div className="space-y-2 mb-4 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Issue Date:</span>
                  <span>{cert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Credits:</span>
                  <span>{cert.creditsEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span>NFT Token:</span>
                  <span className="font-mono">{cert.nftTokenId}</span>
                </div>
              </div>

              {/* Blockchain Hash */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-500 mb-1">Blockchain Hash:</div>
                <div className="font-mono text-xs text-gray-700 break-all">
                  {cert.blockchainHash}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <motion.button
                  className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
                
                <motion.button
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </motion.button>
                
                <motion.button
                  className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blockchain Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span>Blockchain Verification</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Why Blockchain?</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Tamper-proof credential verification</li>
              <li>• Global recognition and portability</li>
              <li>• Permanent record of achievements</li>
              <li>• NFT collectibles for gamification</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Technical Details</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Ethereum-based smart contracts</li>
              <li>• IPFS for metadata storage</li>
              <li>• ERC-721 NFT standard compliance</li>
              <li>• Real-time verification API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};