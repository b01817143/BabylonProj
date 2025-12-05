import createStartScene from "./createStartScene.js";
const CanvasName = "renderCanvas";
const canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);
const eng = new BABYLON.Engine(canvas, true, {}, true);
const startScene = createStartScene(eng);
eng.runRenderLoop(() => {
    startScene.scene.render();
});
