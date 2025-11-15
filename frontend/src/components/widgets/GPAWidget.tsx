import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type CourseGPA = { course: string; grade: number };

export default function GPAWidget({ widget, onChange }: WidgetProps) {
  const [courses, setCourses] = useState<CourseGPA[]>(widget.content || []);

  useEffect(() => onChange(courses), [courses]);

  const addCourse = () => setCourses([...courses, { course: "", grade: 0 }]);

  function updateCourse<K extends keyof CourseGPA>(index: number, field: K, value: CourseGPA[K]) {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  }

  const averageGPA =
    courses.length > 0 ? (courses.reduce((acc, c) => acc + c.grade, 0) / courses.length).toFixed(2) : "0.00";

  return (
    <div>
      <div style={{ marginBottom: 6 }}>Current GPA: {averageGPA}</div>
      {courses.map((c, i) => (
        <div key={i} style={{ display: "flex", marginBottom: 4 }}>
          <input
            placeholder="Course Name"
            value={c.course}
            onChange={(e) => updateCourse(i, "course", e.target.value)}
            style={{ flex: 2, marginRight: 4 }}
          />
          <input
            placeholder="Grade"
            type="number"
            value={c.grade}
            onChange={(e) => updateCourse(i, "grade", Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addCourse}>+ Add Course</button>
    </div>
  );
}
