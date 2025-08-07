import { StaticCanvas, FabricText } from "fabric";
const canvas = new StaticCanvas();
const helloWorld = new FabricText("Hello world!");
canvas.add(helloWorld);
canvas.centerObject(helloWorld);

export default function NewDesign(): React.ReactElement {
  return <div></div>;
}
