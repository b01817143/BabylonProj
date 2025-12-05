// Element1/src/index.ts
// Uses global BABYLON namespace provided by the Babylon CDN scripts in index.html.
//
// index.html must include (before this script):
// <script src="https://cdn.babylonjs.com/babylon.js"></script>
// <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
// <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>

// Let TypeScript know there is a global BABYLON available at runtime.
declare const BABYLON: any;

import createStartScene from "./createStartScene.js";
// Note: CSS should be loaded via <link> in index.html, not imported in JS

const CanvasName = "renderCanvas";

// Create and attach the canvas to the document
const canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

// Use the global BABYLON.Engine provided by the CDN script in index.html
const eng = new BABYLON.Engine(canvas, true, {}, true);

// Create the start scene using your helper
const startScene = createStartScene(eng);

// Start the render loop
eng.runRenderLoop(() => {
  startScene.scene.render();
});
