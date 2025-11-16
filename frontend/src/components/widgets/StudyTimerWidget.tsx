import { useState, useEffect, useRef } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

export default function StudyTimerWidget({ widget, onChange }: WidgetProps) {
  const [workMinutes, setWorkMinutes] = useState<number>(widget.content?.workMinutes || 25);
  const [restMinutes, setRestMinutes] = useState<number>(widget.content?.restMinutes || 5);
  const [isRest, setIsRest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
  if (!isRunning) {
    setTimeLeft(isRest ? restMinutes * 60 : workMinutes * 60);
  }
}, [workMinutes, restMinutes, isRest, isRunning]);

  useEffect(() => {
    onChange({ workMinutes, restMinutes });
  }, [workMinutes, restMinutes]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          handlePhaseSwitch();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, isRest]);

  const handlePhaseSwitch = () => {
  setIsRest(prevRest => {
    const nextRest = !prevRest;
    setTimeLeft(nextRest ? restMinutes * 60 : workMinutes * 60);
    return nextRest;
  });
  setIsRunning(true);
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setIsRest(false);
    setTimeLeft(workMinutes * 60);
  };
  const handleSkipPhase = () => handlePhaseSwitch();

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = () => {
    const total = isRest ? restMinutes * 60 : workMinutes * 60;
    return (timeLeft / total) * 100;
  };

  return (
    <div
      className="widget-box"
      style={{
        backgroundColor: isRest ? "white" : "#dc94e9ff",
        color: isRest ? "#dc94e9ff" : "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      {/* Left: Circular Timer */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <svg width="80%" height="80%" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke={isRest ? "#dc94e9ff" : "white"}
            strokeWidth="3"
            fill="none"
            opacity={0.2}
          />
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke={isRest ? "#dc94e9ff" : "white"}
            strokeWidth="5.5"
            fill="none"
            strokeDasharray={2 * Math.PI * 55}
            strokeDashoffset={2 * Math.PI * 55 * (1 - progressPercent() / 100)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          {/* Small moving icon */}
          <circle
            cx={60 + 55 * Math.cos((2 * Math.PI * progressPercent() / 100 - Math.PI / 2))}
            cy={60 + 55 * Math.sin((2 * Math.PI * progressPercent() / 100 - Math.PI / 2))}
            r="5"
            fill={isRest ? "#dc94e9ff" : "white"}
          />
          <text
            x="60"
            y="68"
            textAnchor="middle"
            fontSize="18"
            fill={isRest ? "#dc94e9ff" : "white"}
          >
            {formatTime(timeLeft)}
          </text>
        </svg>
      </div>

      {/* Right: Mode label + buttons */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingLeft: "1rem",
        }}
      >
        <div style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginTop: "5px" }}>
          {isRest ? "Rest 😌" : "Study 📚"}
        </div>

        {/* Buttons at bottom */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem", marginTop: "50px" }}>
          <button className="widget-btn" onClick={handleStartPause}>
            {isRunning ? "⏸️ Pause" : "▶️ Start"}
          </button>
          <button className="widget-btn" onClick={handleReset}>🔄 Reset</button>
          <button className="widget-btn" onClick={handleSkipPhase}>⏭️ Skip</button>
          {!isEditing && <button className="widget-btn" onClick={() => setIsEditing(true)}>✏️ Edit</button>}
        </div>

        {/* Edit mode for durations */}
        {isEditing && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              placeholder="Work minutes"
              style={{ padding: "4px", borderRadius: "4px" }}
            />
            <input
              type="number"
              min={1}
              value={restMinutes}
              onChange={(e) => setRestMinutes(Number(e.target.value))}
              placeholder="Rest minutes"
              style={{ padding: "4px", borderRadius: "4px" }}
            />
            <button className="widget-btn" onClick={() => setIsEditing(false)}>✅ Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
}

