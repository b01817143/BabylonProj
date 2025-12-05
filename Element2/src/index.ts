import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene.js";
import './main.css';
import {createCharacterController} from "./createCharacterController.js";
import { gui } from "./gui.js";
import { setupCollisions } from "./collisions.js";
import { SceneData } from "./interfaces.js";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);

(async function main() {
    const startScene = await createStartScene(eng);
    createCharacterController(startScene.scene);
    setupCollisions(startScene);
    gui(startScene.scene);
    eng.runRenderLoop(() => {
        startScene.scene.render();
    });
})();