import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      {!user && <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>}
      {!user && <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>}
      {user && (
        <>
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
