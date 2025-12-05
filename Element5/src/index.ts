// index.ts (Element5)

// Global BabylonJS object from <script src="babylon.js">
declare const BABYLON: any;

// Type-only import (removed during JS build → safe for GitHub Pages)
import type { Engine } from "@babylonjs/core";

import createStartScene from "./createStartScene.js";


const CanvasName = "renderCanvas";

// Create canvas dynamically
const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

// Use global BABYLON.Engine instead of ES import
const eng: Engine = new BABYLON.Engine(canvas, true, {}, true);

// Load scene
const startScene = createStartScene(eng);

// Render loop
eng.runRenderLoop(() => {
    startScene.scene.render();
});
