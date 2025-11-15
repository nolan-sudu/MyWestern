import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

export default function DailyQuoteWidget({ widget, onChange }: WidgetProps) {
  const [quote, setQuote] = useState<string>(widget.content || "");

  useEffect(() => onChange(quote), [quote]);

  return (
    <textarea
      value={quote}
      placeholder="Write your daily motivational quote..."
      onChange={(e) => setQuote(e.target.value)}
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
