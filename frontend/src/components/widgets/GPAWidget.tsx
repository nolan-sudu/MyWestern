import { useState } from "react";
import type { Widget } from "../../types";

interface Course {
  id: string;
  name: string;
  grade?: number;
  credits?: number;
}

interface Props {
  widget: Widget;
  onChange: (newContent: any) => void;
}

export default function GPAWidget({ widget, onChange }: Props) {
  const [courses, setCourses] = useState<Course[]>(widget.content?.courses || []);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddCourse = () => {
    const newCourse: Course = { id: Date.now().toString(), name: "", grade: undefined, credits: undefined };
    setCourses([...courses, newCourse]);
    setIsEditing(true);
  };

  const handleDeleteCourse = (id: string) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    onChange({ courses: updated });
  };

  const handleCourseChange = (id: string, field: keyof Course, value: string | number) => {
    const updated = courses.map(c =>
      c.id === id ? { ...c, [field]: field === "name" ? value : Number(value) } : c
    );
    setCourses(updated);
  };

  const confirmChanges = () => {
    onChange({ courses });
    setIsEditing(false);
  };

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits ?? 0), 0);
  const weightedAverage = totalCredits
  ? courses.reduce((sum, c) => sum + ((c.grade ?? 0) * (c.credits ?? 0)), 0) / totalCredits
  : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "100%", overflowY: "auto" }}>
      
      {/* Average at top */}
      <div style={{ fontWeight: "bold", color: "white", marginBottom: "6px" }}>
  Average: {courses.length ? `${weightedAverage.toFixed(2)}%` : "-%"}
</div>

      {/* Courses list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {courses.map(course => (
          isEditing ? (
            <div
              key={course.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                backgroundColor: "rgba(255,255,255,0.05)",
                padding: "4px 6px",
                borderRadius: "6px",
              }}
            >
              {/* Course Name */}
              <input
                type="text"
                value={course.name}
                onChange={e => handleCourseChange(course.id, "name", e.target.value)}
                placeholder="Course name"
                style={{ width: "100%", padding: "4px", borderRadius: "4px" }}
              />

              {/* Grade and Credits Row */}
              <div style={{ display: "flex", gap: "6px" }}>
                <input
                  type="number"
                  value={course.grade || ""}
                  onChange={e => handleCourseChange(course.id, "grade", e.target.value)}
                  placeholder="Grade %"
                  style={{ flex: 1, padding: "4px", borderRadius: "4px" }}
                  min={0}
                  max={100}
                />
                <input
                  type="number"
                  value={course.credits ?? ""}  // <-- use nullish coalescing
                  onChange={e => handleCourseChange(course.id, "credits", Number(e.target.value))}
                  placeholder="Credits"
                  style={{ flex: 1, padding: "4px", borderRadius: "4px" }}
                  min={1}
                />

                <button
                  className="widget-btn"
                  onClick={() => handleDeleteCourse(course.id)}
                  style={{ cursor: "pointer" }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ) : (
            <div
              key={course.id}
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.05)",
                padding: "4px 6px",
                borderRadius: "6px",
              }}
            >
              <span style={{ flex: 2 }}>{course.name}</span>
              <span style={{ flex: 1 }}>{course.grade}</span>
              <span style={{ flex: 1 }}>{course.credits}</span>
            </div>
          )
        ))}
      </div>

      {/* Add Grade button at bottom */}
      {isEditing && (
        <button
          onClick={handleAddCourse}
          style={{
            backgroundColor: "#6c00a2",
            color: "white",
            border: "none",
            padding: "6px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "6px",
          }}
        >
          + Add Grade
        </button>
      )}

      {/* Confirm edits button */}
      {isEditing && (
        <button
          onClick={confirmChanges}
          style={{
            backgroundColor: "#6c00a2",
            color: "white",
            border: "none",
            padding: "6px",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          ✅ Confirm
        </button>
        )}
        {/* Edit Grades toggle BELOW the average */}
{!isEditing && (
  <button
    onClick={() => setIsEditing(true)}
    style={{
      backgroundColor: "#6c00a2",
      color: "white",
      border: "none",
      padding: "6px",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "6px",
    }}
  >
    Edit Grades
  </button>
)}
    </div>
  );
}
