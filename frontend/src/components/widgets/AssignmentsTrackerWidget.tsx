import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type Assignment = { task: string; due: string; done: boolean };

export default function AssignmentsTrackerWidget({ widget, onChange }: WidgetProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(widget.content || []);

  useEffect(() => onChange(assignments), [assignments]);

  const addAssignment = () => setAssignments([...assignments, { task: "", due: "", done: false }]);

  function updateAssignment<K extends keyof Assignment>(index: number, field: K, value: Assignment[K]) {
    const updated = [...assignments];
    updated[index][field] = value;
    setAssignments(updated);
  }

  return (
    <div>
      {assignments.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <input
            placeholder="Task"
            value={a.task}
            onChange={(e) => updateAssignment(i, "task", e.target.value)}
            style={{ flex: 2, marginRight: 4 }}
          />
          <input
            type="date"
            value={a.due}
            onChange={(e) => updateAssignment(i, "due", e.target.value)}
            style={{ flex: 1, marginRight: 4 }}
          />
          <input
            type="checkbox"
            checked={a.done}
            onChange={(e) => updateAssignment(i, "done", e.target.checked)}
          />
        </div>
      ))}
      <button onClick={addAssignment}>+ Add Assignment</button>
    </div>
  );
}
