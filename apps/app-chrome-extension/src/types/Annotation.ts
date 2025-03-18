export interface Annotation {
  id: string | number | null | undefined;
  position: {
    x: number;
    y: number;
  };
  timestamp: number;
  content: string;
  text?: string;
  elementSelector?: string;
}
