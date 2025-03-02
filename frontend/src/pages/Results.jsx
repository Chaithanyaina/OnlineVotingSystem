import { useState, useEffect } from "react";
import { getResults } from "../services/api";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getResults();
        setResults(res.data);
      } catch (error) {
        setError("Failed to fetch election results. Please try again.");
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Election Results</h2>

        {loading ? (
          <p className="text-gray-500 text-center animate-pulse">Fetching results...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : results.length === 0 ? (
          <p className="text-gray-600 text-center">No results available.</p>
        ) : (
          <ul className="space-y-3">
            {results.map((candidate) => (
              <li key={candidate._id} className="p-2 border-b flex justify-between">
                <span className="font-bold">{candidate.name} ({candidate.party})</span>
                <span className="text-blue-600 font-semibold">{candidate.votes} votes</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Results;
