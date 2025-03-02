import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/api";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or localStorage
  const [email] = useState(location.state?.email || localStorage.getItem('regEmail'));

  useEffect(() => {
    if (!email) {
      alert("Email not found!");
      navigate("/register");
    } else {
      localStorage.setItem('regEmail', email);
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await verifyOTP({ email, otp });
      if (res.success) {
        localStorage.removeItem('regEmail');
        alert("OTP verified successfully!");
        navigate("/login");
      }
    } catch (error) {
      setError(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Verify OTP</h2>
        {error && <p className="text-red-600 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full rounded text-center text-lg tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;