import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AnimatedBackground from "./components/AnimatedBackground";

function AppWrapper() {
  const location = useLocation();
  const showNavbar = location.pathname === "/"; // Navbar only on home page

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all 404 */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="main-content">
        <Router>
          <AppWrapper />
        </Router>
      </div>
    </>
  );
}






