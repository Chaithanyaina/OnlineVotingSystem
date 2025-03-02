import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCandidates, submitVote } from "../services/api";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // 🚀 Redirect if not logged in
      return;
    }

    const fetchCandidates = async () => {
      try {
        const res = await getCandidates();
        setCandidates(res.data);
      } catch (error) {
        setError("Error fetching candidates. Please try again.");
      }
    };

    const checkVotingStatus = async () => {
      try {
        const res = await axios.get("/api/check-vote", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.hasVoted) navigate("/results"); // 🚀 Redirect if already voted
      } catch (error) {
        setError("Error checking vote status.");
      }
    };

    fetchCandidates();
    checkVotingStatus();
  }, [navigate]);

  const handleVote = async () => {
    if (!selectedCandidate) {
      setError("Please select a candidate before submitting.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // 🚀 Extra security: Redirect if token is missing
        return;
      }

      const res = await submitVote(selectedCandidate, token);
      alert(res.data.message);
      navigate("/results");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Cast Your Vote</h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <div className="mb-4 space-y-2">
          {candidates.map((candidate, index) => (
            <label key={candidate._id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="candidate"
                value={candidate._id}
                checked={selectedCandidate === candidate._id}
                onChange={() => setSelectedCandidate(candidate._id)}
                className="w-5 h-5"
                autoFocus={index === 0} // Autofocus on first candidate
              />
              <span className="text-lg font-medium">{candidate.name} ({candidate.party})</span>
            </label>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="candidate"
              value="NOTA"
              checked={selectedCandidate === "NOTA"}
              onChange={() => setSelectedCandidate("NOTA")}
              className="w-5 h-5"
            />
            <span className="text-lg font-medium">None of the Above (NOTA)</span>
          </label>
        </div>

        <button
          onClick={handleVote}
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : "Submit Vote"}
        </button>
      </div>
    </div>
  );
};

export default Vote;
