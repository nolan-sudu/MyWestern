import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import "./WidgetGrid.css";
import type { Widget } from "../types.ts";

// Import all 11 widget components
import AcademicCalendarWidget from "./widgets/AcademicCalendarWidget.tsx";
import CoursesOverviewWidget from "./widgets/CoursesOverviewWidget.tsx";
import AssignmentsTrackerWidget from "./widgets/AssignmentsTrackerWidget.tsx";
import FeesAndFinancesWidget from "./widgets/FeesAndFinancesWidget.tsx";
import CampusMapWidget from "./widgets/CampusMapWidget.tsx";
import QuickAccessWidget from "./widgets/QuickAccessWidget.tsx";
import LocalWeatherWidget from "./widgets/LocalWeatherWidget.tsx";
import GPAWidget from "./widgets/GPAWidget.tsx";
import DailyQuoteWidget from "./widgets/DailyQuoteWidget.tsx";
import LinksFolderWidget from "./widgets/LinksFolderWidget.tsx";
import StudyTimerWidget from "./widgets/StudyTimerWidget.tsx";

interface Props {
  widgets: Widget[];
  onRemoveWidget: (id: string) => void;
  onReorder: (newOrder: Widget[]) => void;
  onUpdateWidgetContent: (id: string, newContent: any) => void;
}

export default function WidgetGrid({ widgets, onRemoveWidget, onReorder, onUpdateWidgetContent }: Props) {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    const reordered = Array.from(widgets);
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);

    onReorder(reordered);
  };

  // Mapping widget IDs to components
  const widgetMap: { [key: string]: React.FC<any> } = {
    "academic-calendar": AcademicCalendarWidget,
    "courses-overview": CoursesOverviewWidget,
    assignments: AssignmentsTrackerWidget,
    fees: FeesAndFinancesWidget,
    map: CampusMapWidget,
    "quick-access": QuickAccessWidget,
    weather: LocalWeatherWidget,
    gpa: GPAWidget,
    quote: DailyQuoteWidget,
    "links-folder": LinksFolderWidget,
    "study-timer": StudyTimerWidget,
  };

  return (
    <div className="widget-grid-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div className="widget-grid" ref={provided.innerRef} {...provided.droppableProps}>
              {widgets.map((widget, index) => {
                const WidgetComponent = widgetMap[widget.id];

                return (
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
                          zIndex: snapshot.isDragging ? 10 : "auto",
                          backgroundColor: "rgba(0, 0, 1, 0.55)", // widget box black
                          color: "white",
                        }}
                      >
                        <div className="widget-header">
                          <span className="widget-title">
                            {widget.emoji} {widget.title}
                          </span>
                          <div className="widget-actions">
                            { }
                            <button className="widget-btn" onClick={() => onRemoveWidget(widget.id)}>
                              🗑️
                            </button>
                          </div>
                        </div>

                        { }
                        <div
                          className="widget-content"
                          style={{
                            backgroundColor: "rgba(0, 0, 1, 0.55)", // dark purple content
                            padding: "0.5rem",
                            borderRadius: "8px",
                            maxHeight: "100%",
                            overflowY: "auto",
                          }}
                        >
                          {WidgetComponent && (
                            <WidgetComponent
                              widget={widget}
                              onChange={(c: any) => onUpdateWidgetContent(widget.id, c)}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
