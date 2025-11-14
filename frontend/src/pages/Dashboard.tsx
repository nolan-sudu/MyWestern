import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // Sample widgets data
  const widgets = [
    { id: 1, title: "Courses", content: "View your current courses." },
    { id: 2, title: "Events", content: "Upcoming campus events." },
    { id: 3, title: "Grades", content: "Check your latest grades." },
    { id: 4, title: "Resources", content: "Access university resources." },
  ];

  return (
    <div className="dashboard-container">
      <DashboardNavbar user={user} />
      <div className="dashboard-content">
        <div className="widgets-grid">
          {widgets.map((widget) => (
            <div key={widget.id} className="widget-card">
              <h3>{widget.title}</h3>
              <p>{widget.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

