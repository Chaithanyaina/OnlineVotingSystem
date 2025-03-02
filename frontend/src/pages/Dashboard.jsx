import { useState, useEffect } from "react";
import { getStats } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-105 animate-fadeIn">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-blue-700">
          🗳️ Voting Officer Dashboard
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading statistics...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ul className="space-y-4">
            <li className="font-semibold text-lg">
              Total Registered Voters: <span className="text-blue-600">{stats.totalVoters}</span>
            </li>
            <li className="font-semibold text-lg">
              People Who Voted: <span className="text-green-600">{stats.voted}</span>
            </li>
            <li className="font-semibold text-lg">
              Yet to Vote: <span className="text-red-600">{stats.notVoted}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
