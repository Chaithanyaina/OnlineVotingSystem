import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fadeIn">
        🗳️ Welcome to Online Voting System
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center animate-fadeIn">
        Secure and transparent voting from anywhere.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 hover:bg-gray-200"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
