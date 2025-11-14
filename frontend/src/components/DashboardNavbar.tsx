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

            <div style={{ padding: "8px 15px", fontWeight: 600, opacity: 0.7 }}>
              Add Widget
            </div>

            <button>Academic Calendar</button>
            <button>Courses Overview</button>
            <button>Assignments Tracker</button>
            <button>Fees & Finances</button>
            <button>Campus Map</button>
            <button>Quick Access Links</button>
            <button>Local Weather</button>
            <button>GPA Calculator</button>
            <button>Motivational Quote</button>
            <button>Study Timer</button>
            <button>Links Folder</button>

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
            <button>Profile</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

