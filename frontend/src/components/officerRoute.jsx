import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const OfficerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="mt-3 text-lg font-medium text-gray-700">Verifying Officer Access...</p>
        </div>
      </div>
    );
  }

  // Redirect if the user is not an officer
  if (!user || user.role !== "officer") {
    return <Navigate to="/officer-login" replace />;
  }

  return children;
};

export default OfficerRoute;
