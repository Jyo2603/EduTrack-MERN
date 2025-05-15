import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/AnalysisPage.css';


ChartJS.register(ArcElement, Tooltip, Legend);

// Review generation based on average marks
const getReview = (avg) => {
  if (avg < 20) return 'Study hard';
  if (avg < 30) return 'Needs improvement';
  if (avg < 45) return 'Good';
  return 'Excellent';
};

const AnalysisPage = ({ subject, onBack }) => {
  // Prepare chart data from average marks
  const chartData = {
    labels: subject.students.map(s => s.name),
    datasets: [
      {
        label: 'Avg Marks (out of 30)',
        data: subject.students.map(s => (s.test1 + s.test2) / 2),
        backgroundColor: [
          '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#4CAF50', '#E91E63',
          '#00BCD4', '#FFC107'
        ]
      }
    ]
  };

  // Customize tooltip to show average
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const avg = context.raw;
            return `Average: ${avg.toFixed(2)} / 30`;
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="subject-header">{subject.name} - Performance Overview</h2>

      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>USN</th>
            <th>Average (Test 1 + Test 2)</th>
            <th>Review</th>
            <th>External (20)</th>
          </tr>
        </thead>
        <tbody>
          {subject.students.map((s, idx) => {
            const avg = (s.test1 + s.test2) / 2;
            const usn = s.usn ? s.usn : 'N/A';
            const external = typeof s.external === 'number' ? s.external : 'N/A';

            return (
              <tr key={idx}>
                <td>{s.name}</td>
                <td>{usn}</td>
                <td>{avg.toFixed(2)}</td>
                <td>{getReview(avg)}</td>
                <td>{external}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={onBack} className="analysis-btn back-btn">
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default AnalysisPage;
