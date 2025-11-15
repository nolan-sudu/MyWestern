import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

export default function AcademicCalendarWidget({ widget, onChange }: WidgetProps) {
  const [notes, setNotes] = useState<string>(widget.content || "");

  useEffect(() => {
    onChange(notes);
  }, [notes]);

  return (
    <textarea
      value={notes}
      placeholder="Add calendar notes..."
      onChange={(e) => setNotes(e.target.value)}
      style={{
        width: "100%",
        height: "100%",
        padding: 4,
        borderRadius: 6,
        background: "rgba(0,0,0,0.25)",
        color: "white"
      }}
    />
  );
}
