import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {!isHome && <Link to="/" className="navbar-button">Home</Link>}
        {!user && <Link to="/login" className="navbar-button">Login</Link>}
        {!user && <Link to="/register" className="navbar-button">Register</Link>}

        { }
        {user && isHome && <Link to="/dashboard" className="navbar-button">Dashboard</Link>}

        {user && (
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}


