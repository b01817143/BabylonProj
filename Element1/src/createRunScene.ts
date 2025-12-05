import {} from "@babylonjs/core";

import { SceneData } from "./interfaces.js";

export default function createRunScene(runScene: SceneData) {
 

  runScene.scene.onAfterRenderObservable.add(() => {});
}
