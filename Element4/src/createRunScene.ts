// Tell TypeScript BABYLON exists globally (even if this file doesn't use it yet)
declare const BABYLON: any;

// Type-only import → removed at compile time, safe for GitHub Pages
import type { SceneData } from "./interfaces.js";

export default function createRunScene(runScene: SceneData) {

  // Example: later you can update state or run logic here
  runScene.scene.onAfterRenderObservable.add(() => {
    // console.log("Run scene frame");
  });

}
