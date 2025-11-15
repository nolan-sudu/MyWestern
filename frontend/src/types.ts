export interface Widget {
  id: string;
  title: string;
  emoji: string;
  size: "1x1" | "1x2";
  spanCol?: number;
  content?: any;
}

export interface WidgetProps {
  widget: Widget;
  onChange: (newContent: any) => void;
}
