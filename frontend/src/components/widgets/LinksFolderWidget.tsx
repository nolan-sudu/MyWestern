import { useState } from "react";
import type { Widget } from "../../types";

interface LinkItem {
  id: string;
  name: string;
  url: string;
  isEditing?: boolean;
  tempName?: string;
  tempUrl?: string;
}

interface Props {
  widget: Widget;
  onChange: (newContent: any) => void;
}

export default function LinksFolderWidget({ widget, onChange }: Props) {
  const [links, setLinks] = useState<LinkItem[]>(widget.content?.links || []);

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      name: "",
      url: "",
      isEditing: true,
      tempName: "",
      tempUrl: "",
    };
    const updated = [...links, newLink];
    setLinks(updated);
    onChange({ links: updated });
  };

  const toggleLinkEdit = (id: string) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === id
          ? { ...link, isEditing: true, tempName: link.name, tempUrl: link.url }
          : link
      )
    );
  };

  const confirmLinkEdit = (id: string) => {
    const updated = links.map(link =>
      link.id === id
        ? { ...link, name: link.tempName || link.name, url: link.tempUrl || link.url, isEditing: false }
        : link
    );
    setLinks(updated);
    onChange({ links: updated });
  };

  const handleTempChange = (id: string, field: "tempName" | "tempUrl", value: string) => {
    setLinks(prev => prev.map(link => (link.id === id ? { ...link, [field]: value } : link)));
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter(link => link.id !== id);
    setLinks(updated);
    onChange({ links: updated });
  };

  return (
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      
      {links.map(link => (
        <div
          key={link.id}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: "8px",
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "6px 8px",
            borderRadius: "6px",
          }}
        >
          {link.isEditing ? (
            <>
              <input
                type="text"
                value={link.tempName}
                onChange={e => handleTempChange(link.id, "tempName", e.target.value)}
                placeholder="Link name"
                style={{ padding: "4px", borderRadius: "4px", width: "100%" }}
              />
              <input
                type="text"
                value={link.tempUrl}
                onChange={e => handleTempChange(link.id, "tempUrl", e.target.value)}
                placeholder="URL"
                style={{ padding: "4px", borderRadius: "4px", width: "100%" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                <button
                  onClick={() => confirmLinkEdit(link.id)}
                  style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                >
                  ✅
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                >
                  🗑️
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", textAlign: "left", flex: 1 }}
                onClick={() => window.open(link.url, "_blank")}
              >
                {link.name || "Unnamed Link"}
              </button>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                  onClick={() => toggleLinkEdit(link.id)}
                >
                  ✏️
                </button>
                <button
                  style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                  onClick={() => handleDeleteLink(link.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleAddLink}
        style={{
          backgroundColor: "#6c00a2",
          color: "white",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
          marginTop: "6px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        + Add Link
      </button>
    </div>
    
  );
  
}

