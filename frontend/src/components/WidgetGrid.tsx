import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import "./WidgetGrid.css";
import { useState } from "react";

interface Widget {
  id: string;
  title: string;
  emoji: string;
  size: "1x1" | "1x2"; 
  spanCol?: number; 
}

export default function WidgetGrid() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "academic-calendar", title: "Academic Calendar", emoji: "📅", size: "1x1" },
    { id: "courses-overview", title: "Courses Overview", emoji: "📚", size: "1x1" },
    { id: "assignments", title: "Assignments Tracker", emoji: "📝", size: "1x2" },
    { id: "fees", title: "Fees & Finances", emoji: "💰", size: "1x1" },
    { id: "map", title: "Campus Map", emoji: "🗺️", size: "1x2" },
    { id: "quick-access", title: "Quick Access", emoji: "⚡", size: "1x1" },
    { id: "weather", title: "Local Weather & Alerts", emoji: "☀️", size: "1x1" },
    { id: "gpa", title: "GPA Calculator", emoji: "🎓", size: "1x1" },
    { id: "quote", title: "Daily Quote", emoji: "💡", size: "1x1", spanCol: 2},
    { id: "links-folder", title: "Links Folder", emoji: "🔗", size: "1x2" },
    { id: "study-timer", title: "Study Timer", emoji: "⏱️", size: "1x2" }
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    const reordered = Array.from(widgets);
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);
    setWidgets(reordered);
  };

  return (
    <div className="widget-grid-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div
              className="widget-grid"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided, snapshot) => (
                    <div
  className={`widget-box widget-${widget.size} ${widget.spanCol ? "widget-span-" + widget.spanCol : ""} ${
    snapshot.isDragging ? "dragging" : ""
  }`}
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  style={{ ...provided.draggableProps.style, zIndex: snapshot.isDragging ? 10 : "auto" }}
>

                      <div className="widget-header">
                        <span className="widget-title">{widget.emoji} {widget.title}</span>
                        <div className="widget-actions">
                          <button className="widget-btn">✏️</button>
                          <button className="widget-btn">🗑️</button>
                        </div>
                      </div>
                      <div className="widget-content">
                        <p>Widget content here</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
