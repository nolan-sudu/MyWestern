import "./WidgetBase.css";

interface QuickLink {
  name: string;
  url: string;
  icon: string; 
}

export default function QuickAccessWidget() {
  const quickLinks: QuickLink[] = [
    { name: "Outlook", url: "https://outlook.office.com/", icon: "🌐" },
    { name: "Bright Space", url: "https://westernu.brightspace.com/d2l/home", icon: "📚" },
    { name: "Student Services", url: "https://student.uwo.ca", icon: "🧑‍🎓" },
    { name: "Library", url: "https://www.lib.uwo.ca", icon: "🏛️" },
    { name: "Email", url: "https://outlook.office.com", icon: "✉️" },
    { name: "Campus Map", url: "https://www.uwo.ca/map", icon: "🗺️" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: "0.25rem",
        width: "260px",          // narrower full grid
        height: "100%",
        margin: "0 auto",        // center the grid
        padding: "0.25rem",
        boxSizing: "border-box",
      }}
    >
      {quickLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",     
            backgroundColor: "rgba(0,0,1,0.55)",
            color: "white",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "0.7rem",
            textDecoration: "none",
            padding: "0.3rem",
            aspectRatio: "1 / 1",
            transition: "transform 0.15s, background 0.15s",
          }}
        >
          <span style={{ fontSize: "1.2rem", marginBottom: "0.2rem" }}>{link.icon}</span>
          {link.name}
        </a>
      ))}
    </div>
  );
}
