import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LandingPages from "./pages/LandingPages";
import Forms from "./pages/Forms";
import Analytics from "./pages/Analytics";
import Help from "./pages/Help";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        {isLoggedIn ? (
          <Dashboard onLogout={() => setIsLoggedIn(false)}>
            <Routes>
              <Route path="/" element={<LandingPages />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </Dashboard>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    </Router>
  );
}

export default App;
