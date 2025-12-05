// index.ts

// Global Babylon from script tags
declare const BABYLON: any;

import createStartScene from "./createStartScene.js";
import { createCharacterController } from "./createCharacterController.js";
import { gui } from "./gui.js";
import { setupCollisions } from "./collisions.js";
import type { SceneData } from "./interfaces.js";
import type { Engine as BabylonEngine } from "@babylonjs/core";

const CanvasName = "renderCanvas";

// Create canvas dynamically and add to DOM
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

// Use global BABYLON.Engine
const eng: BabylonEngine = new BABYLON.Engine(canvas, true, {}, true);

(async function main() {
  const startScene: SceneData = await createStartScene(eng);

  createCharacterController(startScene.scene);
  setupCollisions(startScene);
  gui(startScene.scene);

  eng.runRenderLoop(() => {
    startScene.scene.render();
  });
})();
