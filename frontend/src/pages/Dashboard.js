import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ teacher, onViewAnalysis, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {teacher.name}</h2>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      {teacher.subjects.map((subject, idx) => (
        <div key={idx} className="subject-card">
          <h3>{subject.name} (Sem {subject.semester})</h3>

          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Test 1</th>
                <th>Test 2</th>
              </tr>
            </thead>
            <tbody>
              {subject.students.map((student, sidx) => (
                <tr key={sidx}>
                  <td>{student.name}</td>
                  <td>{student.test1}</td>
                  <td>{student.test2}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => onViewAnalysis(subject)} className="analysis-btn">
            View Analysis
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
