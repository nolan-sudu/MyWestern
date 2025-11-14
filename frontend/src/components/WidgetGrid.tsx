import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult
} from "@hello-pangea/dnd";
import "./WidgetGrid.css";
import type { Widget } from "../pages/Dashboard";

interface Props {
  widgets: Widget[];
  onRemoveWidget: (id: string) => void;
  onReorder: (newOrder: Widget[]) => void;
}

export default function WidgetGrid({ widgets, onRemoveWidget, onReorder }: Props) {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    const reordered = Array.from(widgets);
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);

    onReorder(reordered);
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
                      className={`widget-box widget-${widget.size} ${
                        widget.spanCol ? "widget-span-" + widget.spanCol : ""
                      } ${snapshot.isDragging ? "dragging" : ""}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        zIndex: snapshot.isDragging ? 10 : "auto"
                      }}
                    >
                      <div className="widget-header">
                        <span className="widget-title">
                          {widget.emoji} {widget.title}
                        </span>

                        <div className="widget-actions">
                          <button className="widget-btn">✏️</button>
                          <button
                            className="widget-btn"
                            onClick={() => onRemoveWidget(widget.id)}
                          >
                            🗑️
                          </button>
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

