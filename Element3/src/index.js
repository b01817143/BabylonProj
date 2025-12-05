var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createStartScene from "./createStartScene.js";
import { createCharacterController } from "./createCharacterController.js";
import { gui } from "./gui.js";
import { setupCollisions } from "./collisions.js";
const CanvasName = "renderCanvas";
const canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);
const eng = new BABYLON.Engine(canvas, true, {}, true);
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
