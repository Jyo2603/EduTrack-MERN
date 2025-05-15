import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  const [teacher, setTeacher] = useState(null);
  const [analysisSubject, setAnalysisSubject] = useState(null);

  const handleAnalysis = (subject) => {
    setAnalysisSubject(subject);
  };

  const handleLogout = () => {
    alert("Logging out...");
    setTeacher(null); // Log out by clearing teacher state
    setAnalysisSubject(null); // Just in case
  };

  if (!teacher) return <LoginPage onLogin={setTeacher} />;

  if (analysisSubject) {
    return <AnalysisPage subject={analysisSubject} onBack={() => setAnalysisSubject(null)} />;
  }

  return (
    <Dashboard
      teacher={teacher}
      onViewAnalysis={handleAnalysis}
      onLogout={handleLogout}
    />
  );
}

export default App;
