
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import './styles/global.css';
import './App.css';
import App from './App.jsx'
// src/main.jsx
import { AuthProvider } from "./context/AuthContext";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
