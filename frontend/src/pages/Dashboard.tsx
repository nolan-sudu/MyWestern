import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name || user.email}!</p>
    </div>
  );
}
