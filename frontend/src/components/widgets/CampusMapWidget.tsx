import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

export default function CampusMapWidget({ widget, onChange }: WidgetProps) {
  const [locationNotes, setLocationNotes] = useState<string>(widget.content || "");

  useEffect(() => onChange(locationNotes), [locationNotes]);

  return (
    <textarea
      value={locationNotes}
      placeholder="Add campus locations or notes..."
      onChange={(e) => setLocationNotes(e.target.value)}
      style={{
        width: "100%",
        height: "100%",
        padding: 4,
        borderRadius: 6,
        background: "rgba(0,0,0,0.25)",
        color: "white",
      }}
    />
  );
}
