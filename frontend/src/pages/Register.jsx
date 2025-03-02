import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    voterId: "",
    email: "",
    password: "",
    constituency: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    let newErrors = {};

    if (!/^[A-Za-z]{3}\d{7}$/.test(formData.voterId)) {
      newErrors.voterId = "Voter ID must be 3 letters followed by 7 digits (e.g., ABC1234567).";
    }

    if (!/^[A-Za-z]{3}\d{7}$/.test(formData.voterId)) {
      newErrors.voterId = "Voter ID must be in the format ABC1234567.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const res = await registerUser(formData);
      if (res.success) {
        navigate('/verify-otp', { state: { email: formData.email } });
      }
    } catch (error) {
      setErrors({ form: error.response?.data?.error || "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Register</h2>

        {errors.form && <p className="text-red-600 text-sm text-center mb-3">{errors.form}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.name}
            disabled={loading}
            required
          />

          <input
            type="text"
            name="aadhaar"
            placeholder="Aadhaar Number"
            className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.aadhaar}
            disabled={loading}
            required
          />
          {errors.aadhaar && <p className="text-red-500 text-sm">{errors.aadhaar}</p>}

          <input
            type="text"
            name="voterId"
            placeholder="Voter ID"
            className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.voterId}
            disabled={loading}
            required
          />
          {errors.voterId && <p className="text-red-500 text-sm">{errors.voterId}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.email}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.password}
            disabled={loading}
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <select
            name="constituency"
            className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.constituency}
            disabled={loading}
            required
          >
            <option value="">Select Constituency</option>
            <option value="north">North Constituency</option>
            <option value="south">South Constituency</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;