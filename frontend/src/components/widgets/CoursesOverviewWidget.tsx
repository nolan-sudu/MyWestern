import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type Course = { name: string; code: string };

export default function CoursesOverviewWidget({ widget, onChange }: WidgetProps) {
  const [courses, setCourses] = useState<Course[]>(widget.content || []);

  useEffect(() => onChange(courses), [courses]);

  const addCourse = () => setCourses([...courses, { name: "", code: "" }]);

  function updateCourse<K extends keyof Course>(index: number, field: K, value: Course[K]) {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  }

  return (
    <div>
      {courses.map((c, i) => (
        <div key={i} style={{ display: "flex", marginBottom: 4 }}>
          <input
            placeholder="Course Name"
            value={c.name}
            onChange={(e) => updateCourse(i, "name", e.target.value)}
            style={{ flex: 2, marginRight: 4 }}
          />
          <input
            placeholder="Code"
            value={c.code}
            onChange={(e) => updateCourse(i, "code", e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addCourse}>+ Add Course</button>
    </div>
  );
}
