import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

export default function LocalWeatherWidget({ widget, onChange }: WidgetProps) {
  const [city, setCity] = useState<string>(widget.content || "");

  useEffect(() => onChange(city), [city]);

  return (
    <input
      placeholder="Enter city for local weather"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      style={{
        width: "100%",
        padding: 4,
        borderRadius: 6,
        background: "rgba(0,0,0,0.25)",
        color: "white",
      }}
    />
  );
}
