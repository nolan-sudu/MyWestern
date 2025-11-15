import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type Timer = { label: string; minutes: number };

export default function StudyTimerWidget({ widget, onChange }: WidgetProps) {
  const [timers, setTimers] = useState<Timer[]>(widget.content || []);

  useEffect(() => onChange(timers), [timers]);

  const addTimer = () => setTimers([...timers, { label: "", minutes: 25 }]);

  function updateTimer<K extends keyof Timer>(index: number, field: K, value: Timer[K]) {
    const updated = [...timers];
    updated[index][field] = value;
    setTimers(updated);
  }

  return (
    <div>
      {timers.map((t, i) => (
        <div key={i} style={{ display: "flex", marginBottom: 4 }}>
          <input
            placeholder="Label"
            value={t.label}
            onChange={(e) => updateTimer(i, "label", e.target.value)}
            style={{ flex: 2, marginRight: 4 }}
          />
          <input
            placeholder="Minutes"
            type="number"
            value={t.minutes}
            onChange={(e) => updateTimer(i, "minutes", Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addTimer}>+ Add Timer</button>
    </div>
  );
}
