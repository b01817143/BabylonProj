// Tell TypeScript that BABYLON exists globally (from script tags)
declare const BABYLON: any;


import createStartScene from "./createStartScene.js";
import { createCharacterController } from "./createCharacterController.js";
import { gui } from "./gui.js";
import { setupCollisions } from "./collisions.js";
import type { SceneData } from "./interfaces.js"; // optional, only for typing

const CanvasName = "renderCanvas";

// Create and attach canvas
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

// Use global BABYLON.Engine
const eng = new BABYLON.Engine(canvas, true, {}, true);

(async function main() {
  const startScene: SceneData = await createStartScene(eng);

  createCharacterController(startScene.scene);
  setupCollisions(startScene);
  gui(startScene.scene);

  eng.runRenderLoop(() => {
    startScene.scene.render();
  });
})();
