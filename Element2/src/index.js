var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import './main.css';
import { createCharacterController } from "./createCharacterController";
import { gui } from "./gui";
import { setupCollisions } from "./collisions";
const CanvasName = "renderCanvas";
let canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);
let eng = new Engine(canvas, true, {}, true);
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const startScene = yield createStartScene(eng);
        createCharacterController(startScene.scene);
        setupCollisions(startScene);
        gui(startScene.scene);
        eng.runRenderLoop(() => {
            startScene.scene.render();
        });
    });
})();
