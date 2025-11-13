import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnimatedBackground from "./components/AnimatedBackground";

function AppWrapper() {
  const location = useLocation();
  const showNavbar = location.pathname === "/"; 

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
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





