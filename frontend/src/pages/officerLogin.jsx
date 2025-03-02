import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { officerLogin } from "../services/api";

const OfficerLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await officerLogin(credentials);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "officer");
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Invalid officer credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Officer Login</h2>

        {error && <p className="text-red-600 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Officer ID"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={credentials.username}
            disabled={loading}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={credentials.password}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 w-full rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficerLogin;