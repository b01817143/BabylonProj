// index.ts

// Global Babylon from script tag
declare const BABYLON: any;


import createStartScene from "./createStartScene.js";
import createRunScene from "./createRunScene.js";

// Type-only imports → no JS output
import type { Engine as BabylonEngine } from "@babylonjs/core";
import type { SceneData } from "./interfaces.js";

const CanvasName = "renderCanvas";

// Create and attach canvas
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

// Use global BABYLON.Engine
const eng: BabylonEngine = new BABYLON.Engine(canvas, true, {}, true);

// Start + run scene
const startScene: SceneData = createStartScene(eng);
createRunScene(startScene);

eng.runRenderLoop(() => {
  startScene.scene.render();
});

