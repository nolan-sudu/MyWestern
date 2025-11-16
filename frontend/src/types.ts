export interface Widget {
  id: string;
  title: string;
  emoji: string;
  size: "1x1" | "1x2" | "2x1" | "2x2";  
  content?: any;
}

export interface WidgetProps {
  widget: Widget;
  onChange: (newContent: any) => void;
}
