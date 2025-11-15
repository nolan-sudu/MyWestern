import { useState, useEffect } from "react";
import type { WidgetProps } from "../../types";
import "./WidgetBase.css";

type FolderLink = { folderName: string; links: string[] };

export default function LinksFolderWidget({ widget, onChange }: WidgetProps) {
  const [folders, setFolders] = useState<FolderLink[]>(widget.content || []);

  useEffect(() => onChange(folders), [folders]);

  const addFolder = () => setFolders([...folders, { folderName: "", links: [] }]);

  const updateFolder = (index: number, field: keyof FolderLink, value: any) => {
    const updated = [...folders];
    updated[index][field] = value;
    setFolders(updated);
  };

  return (
    <div>
      {folders.map((f, i) => (
        <div key={i} style={{ marginBottom: 4 }}>
          <input
            placeholder="Folder Name"
            value={f.folderName}
            onChange={(e) => updateFolder(i, "folderName", e.target.value)}
            style={{ width: "100%", marginBottom: 2 }}
          />
          <textarea
            placeholder="Links (comma separated)"
            value={f.links.join(",")}
            onChange={(e) => updateFolder(i, "links", e.target.value.split(","))}
            style={{ width: "100%", height: 50 }}
          />
        </div>
      ))}
      <button onClick={addFolder}>+ Add Folder</button>
    </div>
  );
}
