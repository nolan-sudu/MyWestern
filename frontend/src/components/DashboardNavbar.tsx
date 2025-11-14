import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./DashboardNavbar.css";

interface Props {
  user: any;
  availableWidgets: { id: string; title: string; emoji: string }[];
  onAddWidget: (id: string) => void;
}

export default function DashboardNavbar({ user, availableWidgets, onAddWidget }: Props) {
  const { logout } = useAuth();
  const [showWidgetsMenu, setShowWidgetsMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  return (
    <div className="dashboard-navbar">
      {/* LEFT - Add Widgets */}
      <div className="navbar-left">
        <button
          onClick={() => setShowWidgetsMenu((s) => !s)}
          className="navbar-button"
        >
          +
        </button>

        {showWidgetsMenu && (
          <div className="dropdown widget-dropdown">
            <div className="dropdown-header">Add Widget</div>

            {availableWidgets.length === 0 && (
              <div className="dropdown-empty">All widgets added</div>
            )}

            {availableWidgets.map((w) => (
              <button key={w.id} onClick={() => onAddWidget(w.id)}>
                {w.emoji} {w.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CENTER - User greeting */}
      <div className="navbar-center">
        <span>Welcome, {user.name || user.email}!</span>
      </div>

      {/* RIGHT - Settings */}
      <div className="navbar-right">
        <button
          onClick={() => setShowSettingsMenu((s) => !s)}
          className="navbar-button"
        >
          ⚙️
        </button>

        {showSettingsMenu && (
          <div className="dropdown settings-dropdown right">
            <button>Profile</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}


