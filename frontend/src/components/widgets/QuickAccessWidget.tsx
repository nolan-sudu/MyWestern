import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type Link = { name: string; url: string };

export default function QuickAccessWidget({ widget, onChange }: WidgetProps) {
  const [links, setLinks] = useState<Link[]>(widget.content || []);

  useEffect(() => onChange(links), [links]);

  const addLink = () => setLinks([...links, { name: "", url: "" }]);

  function updateLink<K extends keyof Link>(index: number, field: K, value: Link[K]) {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  }

  return (
    <div>
      {links.map((link, i) => (
        <div key={i} style={{ display: "flex", marginBottom: 4 }}>
          <input
            placeholder="Name"
            value={link.name}
            onChange={(e) => updateLink(i, "name", e.target.value)}
            style={{ flex: 1, marginRight: 4 }}
          />
          <input
            placeholder="URL"
            value={link.url}
            onChange={(e) => updateLink(i, "url", e.target.value)}
            style={{ flex: 2 }}
          />
        </div>
      ))}
      <button onClick={addLink}>+ Add Link</button>
    </div>
  );
}
