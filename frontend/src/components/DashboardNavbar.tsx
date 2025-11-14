import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./DashboardNavbar.css";

export default function DashboardNavbar({ user }: { user: any }) {
  const { logout } = useAuth();
  const [showWidgetsMenu, setShowWidgetsMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  return (
    <div className="dashboard-navbar">
      <div className="navbar-left">
        <button onClick={() => setShowWidgetsMenu(!showWidgetsMenu)} className="navbar-button">
          +
        </button>
        {showWidgetsMenu && (
          <div className="dropdown">
            <button>Add Widget</button>
            <button>Remove Widget</button>
            <button>Rearrange Widgets</button>
          </div>
        )}
      </div>

      <div className="navbar-center">
        <span>Welcome, {user.name || user.email}!</span>
      </div>

      <div className="navbar-right">
        <button onClick={() => setShowSettingsMenu(!showSettingsMenu)} className="navbar-button">
          ⚙️
        </button>
        {showSettingsMenu && (
          <div className="dropdown right">
            <button>Profile Management</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

