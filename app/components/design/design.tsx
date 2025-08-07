"use client";

import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Circle, FabricImage, Rect, Textbox, Triangle } from "fabric";
import { Canvas } from "fabric";
import html2canvas from "html2canvas";
import { canvasAtom, updateDesignAtom } from "../../store/design";
import { CanvasElement, DesignWithElements } from "../../lib/types/design";
import Button from "./button";
import ImageUploadButton from "./upload-image/button";

export default function Home({
  initialCanvas,
  id,
}: {
  initialCanvas: DesignWithElements;
  id?: string;
}) {
  const canvasRef = useRef<Canvas | null>(null);
  const [canvasData, setCanvasData] = useAtom(canvasAtom);
  const [, saveDesign] = useAtom(updateDesignAtom);

  useEffect(() => {
    if (canvasRef.current) return;
    if (!initialCanvas) return;

    setCanvasData({
      ...initialCanvas,
      id: id ?? initialCanvas.id, // Use provided id or fallback to existing
      privacy: "private",
    });
    const fabricCanvas = new Canvas("canvas", {
      width: initialCanvas.width,
      height: initialCanvas.height,
      backgroundColor: initialCanvas.backgroundColor,
    });

    canvasRef.current = fabricCanvas;

    fabricCanvas.on("object:added", updateElementsState);
    fabricCanvas.on("object:removed", updateElementsState);
    fabricCanvas.on("object:modified", updateElementsState);
    const loadElements = async () => {
      for (const el of initialCanvas.elements) {
        if (el.type === "text") {
          const text = new Textbox(el.text || "", {
            left: el.left,
            top: el.top,
            fontSize: el.fontSize,
            fontFamily: el.fontFamily,
            fontStyle: el.fontStyle || "normal",
            fontWeight: el.fontWeight || "normal",
          });
          fabricCanvas.add(text);
        } else if (el.type === "image" && el.src) {
          try {
            const img = await FabricImage.fromURL(el.src);
            img.set({
              left: el.left,
              top: el.top,
              scaleX: el.scaleX,
              scaleY: el.scaleY,
            });
            fabricCanvas.add(img);
          } catch (error) {
            console.error(`Failed to load image from ${el.src}:`, error);
          }
        } else if (el.type === "rect") {
          const rect = new Rect({
            left: el.left,
            top: el.top,
            width: el.width || 100,
            height: el.height || 100,
            fill: el.fill || "black",
            scaleX: el.scaleX || 1,
            scaleY: el.scaleY || 1,
          });
          fabricCanvas.add(rect);
        } else if (el.type === "circle") {
          const circle = new Circle({
            left: el.left,
            top: el.top,
            radius: el.radius || 50,
            fill: el.fill || "black",
            scaleX: el.scaleX || 1,
            scaleY: el.scaleY || 1,
          });
          fabricCanvas.add(circle);
        } else if (el.type === "triangle") {
          const triangle = new Triangle({
            left: el.left,
            top: el.top,
            width: el.width || 100,
            height: el.height || 100,
            fill: el.fill || "black",
            scaleX: el.scaleX || 1,
            scaleY: el.scaleY || 1,
          });
          fabricCanvas.add(triangle);
        }
      }

      fabricCanvas.renderAll();
      updateElementsState();
    };

    loadElements().catch((error) => {
      console.error("Error loading elements:", error);
    });
  }, [initialCanvas]);

  const updateElementsState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updatedElements: CanvasElement[] = canvas
      .getObjects()
      .map((obj) => {
        const common = {
          id: crypto.randomUUID(),
          left: obj.left || 0,
          top: obj.top || 0,
          scaleX: obj.scaleX || 1,
          scaleY: obj.scaleY || 1,
          fill: "fill" in obj ? (obj.fill as string) : undefined,
        };

        console.log(canvas.getObjects());

        switch (obj.type) {
          case "textbox": {
            const t = obj as Textbox;
            return {
              ...common,
              type: "text",
              text: t.text || "",
              fontSize: t.fontSize || 16,
              fontFamily: t.fontFamily || "Arial",
              fontWeight: t.fontWeight as string,
              fontStyle: t.fontStyle as string,
            };
          }
          case "image": {
            const i = obj as FabricImage;
            return {
              ...common,
              type: "image",
              src: i.getSrc(),
            };
          }
          case "rect": {
            const r = obj as Rect;
            return {
              ...common,
              type: "rect",
              width: r.width ?? 100,
              height: r.height ?? 100,
            };
          }
          case "circle": {
            const c = obj as Circle;
            return {
              ...common,
              type: "circle",
              radius: c.radius ?? 50,
            };
          }
          case "triangle": {
            const t = obj as Triangle;
            return {
              ...common,
              type: "triangle",
              width: t.width ?? 100,
              height: t.height ?? 100,
            };
          }
          default:
            return null;
        }
      })
      .filter(Boolean) as CanvasElement[];

    setCanvasData((val) => ({
      ...val,
      elements: updatedElements,
    }));
  };

  const handleExport = async () => {
    const canvasEl = document.getElementById("canvas-container");
    if (!canvasEl) return;
    const exportCanvas = await html2canvas(canvasEl);
    const image = exportCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = "design.png";
    a.click();
  };

  const handleAddText = () => {
    if (!canvasRef.current) return;
    const text = new Textbox("New Text", {
      left: 100,
      top: 100,
      fontSize: 20,
      fontFamily: "Arial",
      fontStyle: "normal",
      fontWeight: "normal",
    });
    text.set({
      id: crypto.randomUUID(),
    });
    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
  };

  const handleFabricImageUpload = async (url: string) => {
    if (!canvasRef.current) return;

    const img = await FabricImage.fromURL(url);
    img.set({ left: 100, top: 100 });

    const naturalWidth = img.width || 1;
    const naturalHeight = img.height || 1;
    const maxDimension = 1000;
    let scale = 1;

    if (naturalWidth > naturalHeight) {
      if (naturalWidth > maxDimension) {
        scale = maxDimension / naturalWidth;
      }
    } else {
      if (naturalHeight > maxDimension) {
        scale = maxDimension / naturalHeight;
      }
    }

    img.scaleToWidth(naturalWidth * scale);
    canvasRef.current.add(img);
    canvasRef.current.renderAll();
  };

  const bringToFront = () => {
    const canvas = canvasRef.current;
    const obj = canvas?.getActiveObject();

    if (canvas && obj) {
      canvas.bringObjectToFront(obj);
      canvas.renderAll();
    }
  };

  const sendToBack = () => {
    const canvas = canvasRef.current;
    const obj = canvas?.getActiveObject();

    if (canvas && obj) {
      canvas.sendObjectToBack(obj);
      canvas.renderAll();
    }
  };

  const makeBold = () => {
    const obj = canvasRef.current?.getActiveObject() as Textbox;
    if (obj && obj.isType("textbox")) {
      obj.set("fontWeight", obj.fontWeight === "bold" ? "normal" : "bold");
      canvasRef.current?.renderAll();
    }
  };

  const makeItalic = () => {
    const obj = canvasRef.current?.getActiveObject() as Textbox;
    if (obj && obj.isType("textbox")) {
      obj.set("fontStyle", obj.fontStyle === "italic" ? "normal" : "italic");
      canvasRef.current?.renderAll();
    }
  };

  const changeFontSize = (size: number) => {
    const obj = canvasRef.current?.getActiveObject() as Textbox;
    if (obj && obj.isType("textbox")) {
      obj.set("fontSize", size);
      canvasRef.current?.renderAll();
    }
  };

  const deleteActiveObject = () => {
    const canvas = canvasRef.current;
    const obj = canvas?.getActiveObject();
    if (canvas && obj) {
      canvas.remove(obj);
      canvas.renderAll();
    }
  };
  const addRectangle = () => {
    const rect = new Rect({
      width: 150,
      height: 100,
      left: 100,
      top: 100,
      fill: "#D9D9D9",
    });
    canvasRef.current?.add(rect);
  };

  const addCircle = () => {
    const circle = new Circle({
      radius: 50,
      left: 100,
      top: 100,
      fill: "#D9D9D9",
      key: "",
    });
    canvasRef.current?.add(circle);
  };

  const addTriangle = () => {
    const triangle = new Triangle({
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      fill: "#D9D9D9",
    });
    canvasRef.current?.add(triangle);
  };

  const handleBackgroundColorChange = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.backgroundColor = color;
    canvasRef.current?.renderAll();

    setCanvasData((val) => ({
      ...val,
      backgroundColor: color,
    }));
  };

  const objectColourChange = (color: string) => {
    const obj = canvasRef.current?.getActiveObject();
    if (obj && "fill" in obj) {
      obj.set("fill", color);
      canvasRef.current?.renderAll();
    }
  };

  const handleSaveDesign = () => {
    saveDesign(canvasData.id);
  };

  return (
    <div className="p-4 bg-slate-400 min-h-screen min-w-screen relative">
      <div className="text-xl p-2">{initialCanvas.name}</div>
      <div id="controls " className="sticky top-0 z-10 p-4">
        <div className="flex gap-2 m-4">
          {" "}
          <ImageUploadButton onUploadComplete={handleFabricImageUpload} />
          <Button onClick={handleExport}>Export Design</Button>
          <Button onClick={handleSaveDesign}>Save Design</Button>
        </div>

        <div className="grid grid-cols-8 gap-2 ">
          <Button onClick={handleAddText}>Add Text</Button>
          <Button onClick={addCircle}>Circle</Button>
          <Button onClick={addRectangle}>Rectangle</Button>
          <Button onClick={addTriangle}>Triangle</Button>

          <Button onClick={() => changeFontSize(12)}>Font 12</Button>
          <Button onClick={() => changeFontSize(24)}>Font 24</Button>
          <Button onClick={makeBold}>Bold</Button>
          <Button onClick={makeItalic}>Italic</Button>
          <Button onClick={bringToFront}>Bring to Front</Button>
          <Button onClick={sendToBack}>Send to Back</Button>
          <Button onClick={deleteActiveObject}>Delete</Button>

          <div className="flex items-center gap-2 mt-4">
            <label className="text-sm">Background:</label>
            <input
              type="color"
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <label className="text-sm">Object Colour:</label>
            <input
              type="color"
              onChange={(e) => objectColourChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div id="canvas-container" className="border w-fit">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}
