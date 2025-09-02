import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthForm } from './components/AuthForm';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EduMateAI...</p>
        </div>
      </div>
    );
  }

  if (!user && showAuth) {
    return <AuthForm onSuccess={() => setShowAuth(false)} />;
  }

  if (!user) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;