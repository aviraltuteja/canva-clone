export type ElementType = "text" | "image" | "rect" | "circle" | "triangle";

export interface TextCanvasElement {
  id: string;
  type: "text";
  text: string; // Required for text
  src?: never; // Explicitly exclude src
  left: number;
  top: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  scaleX?: number;
  scaleY?: number;
}

export interface ImageCanvasElement {
  id: string;
  type: "image";
  text?: never; // Explicitly exclude text
  src: string; // Required for image
  left: number;
  top: number;
  fontSize?: never;
  fontFamily?: never;
  fontWeight?: never;
  fontStyle?: never;
  scaleX: number;
  scaleY: number;
}

export interface ShapeCanvasElement {
  id: string;
  type: "rect" | "circle" | "triangle";
  left: number;
  top: number;
  scaleX?: number;
  scaleY?: number;
  width: number;
  height: number;
  radius?: number;
  fill?: string;
}

export type CanvasElement =
  | TextCanvasElement
  | ImageCanvasElement
  | ShapeCanvasElement;

export interface DesignWithElements {
  id: string;
  name: string;
  height: number;
  width: number;
  backgroundColor: string;
  privacy: "private" | "shared" | "template";
  createdAt: string;
  updatedAt: string;
  elements: CanvasElement[];
}
