import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Example data for the chart
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weight Progress',
        data: [80, 79, 78, 77],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Fitness Progress',
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}!</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Current Weight</h3>
          <p>77 kg</p>
        </div>
        <div className="stat-card">
          <h3>Goal Weight</h3>
          <p>70 kg</p>
        </div>
        <div className="stat-card">
          <h3>Workouts This Week</h3>
          <p>3</p>
        </div>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>30 min Running - 300 calories</li>
          <li>45 min Weight Training - 200 calories</li>
          <li>1 hour Yoga - 150 calories</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 