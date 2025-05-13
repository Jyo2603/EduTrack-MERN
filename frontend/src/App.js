import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  const [teacher, setTeacher] = useState(null);
  const [analysisSubject, setAnalysisSubject] = useState(null);

  if (!teacher) return <LoginPage onLogin={setTeacher} />;

  if (analysisSubject) {
    return <AnalysisPage subject={analysisSubject} onBack={() => setAnalysisSubject(null)} />;
  }

  return <Dashboard teacher={teacher} onViewAnalysis={setAnalysisSubject} />;
}

export default App;
