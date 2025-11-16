import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";
import WidgetGrid from "../components/WidgetGrid";
import { useState } from "react";
import "./Dashboard.css";

export interface Widget {
  id: string;
  title: string;
  emoji: string;
  size: "1x1" | "1x2" | "2x1" | "2x2";  
  content?: any;
}

const ALL_WIDGETS: Widget[] = [
  { id: "academic-calendar", title: "Academic Calendar", emoji: "📅", size: "1x1" },
  { id: "courses-overview", title: "Courses Overview", emoji: "📚", size: "1x2" },
  { id: "assignments", title: "Assignments Tracker", emoji: "📝", size: "2x1" },
  { id: "fees", title: "Fees & Finances", emoji: "💰", size: "1x1" },
  { id: "map", title: "Campus Map", emoji: "🗺️", size: "2x2" },
  { id: "quick-access", title: "Quick Access", emoji: "⚡", size: "1x1" },
  { id: "weather", title: "Local Weather & Alerts", emoji: "☀️", size: "1x1" },
  { id: "gpa", title: "GPA Calculator", emoji: "🎓", size: "1x1" },
  { id: "quote", title: "Daily Quote", emoji: "💡", size: "1x1"},
  { id: "links-folder", title: "Links Folder", emoji: "🔗", size: "1x1" },
  { id: "study-timer", title: "Study Timer", emoji: "⏱️", size: "1x2"}
];

export default function Dashboard() {
  const { user } = useAuth();

  const [widgets, setWidgets] = useState<Widget[]>([
    ALL_WIDGETS[0],
    ALL_WIDGETS[1],
    ALL_WIDGETS[2],
  ]);

  if (!user) return <Navigate to="/login" />;

  // Add widget from navbar
  const handleAddWidget = (id: string) => {
    const widget = ALL_WIDGETS.find((w) => w.id === id);
    if (!widget) return;
    if (widgets.some((w) => w.id === id)) return; // prevent duplicates
    setWidgets([...widgets, widget]);
  };

  // Remove widget
  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  // Reorder widgets after drag/drop
  const handleReorder = (newOrder: Widget[]) => {
    setWidgets(newOrder);
  };

  // Update widget content
  const handleUpdateWidgetContent = (id: string, newContent: any) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, content: newContent } : w))
    );
  };

  // Compute unused widgets for + dropdown
  const unusedWidgets = ALL_WIDGETS.filter(
    (w) => !widgets.some((active) => active.id === w.id)
  );

  return (
    <div className="dashboard-container">
      <DashboardNavbar
        user={user}
        availableWidgets={unusedWidgets}
        onAddWidget={handleAddWidget}
      />

      <div className="dashboard-content">
        <WidgetGrid
          widgets={widgets}
          onRemoveWidget={handleRemoveWidget}
          onReorder={handleReorder}
          onUpdateWidgetContent={handleUpdateWidgetContent}
        />
      </div>
    </div>
  );
}

