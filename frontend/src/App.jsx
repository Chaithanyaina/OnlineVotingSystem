import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import VerifyOTP from "./pages/VerifyOTP";
import OfficerRoute from "./components/officerRoute";
import OfficerLogin from "./pages/officerLogin";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Scrollable Content - Dynamic Height */}
      <main className="flex-grow flex justify-center items-center min-h-[calc(100vh-128px)]">
        <div className="w-full max-w-4xl px-4"> {/* Centers content */}
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <OfficerRoute>
                    <Dashboard />
                  </OfficerRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <PrivateRoute>
                    <Results />
                  </PrivateRoute>
                }
              />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/officer-login" element={<OfficerLogin />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </main>

      {/* Relative Footer */}
      <Footer />
    </div>
  );
}

export default App;
