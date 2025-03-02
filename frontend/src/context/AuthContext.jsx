import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Logout function (moved above useEffect)
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Only navigate when explicitly logging out
  }, [navigate]);

// context/AuthContext.js
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Invalid token, logging out...");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
}, [navigate]);

  // ✅ Login function
  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      localStorage.setItem("token", token);
      setUser(decodedUser);
      navigate(decodedUser.role === "officer" ? "/dashboard" : "/vote");
    } catch (error) {
      console.error("Invalid login token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
