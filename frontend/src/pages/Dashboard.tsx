import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import WidgetGrid from "../components/WidgetGrid";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="dashboard-container">
      <DashboardNavbar user={user} />
      <div className="dashboard-content">
        <WidgetGrid />
      </div>
    </div>
  );
}

