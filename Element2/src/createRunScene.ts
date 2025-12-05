// Use global BABYLON instead of module imports
declare const BABYLON: any;

import {} from "@babylonjs/core";
import { SceneData } from "./interfaces.js";

export default function createRunScene(runScene: SceneData) {

  // stash for messages to other scripts via externalData
  var stash: { [key: string]: string } = { message: "Empty Stash" };

  runScene.scene.onAfterRenderObservable.add(() => {});
}
