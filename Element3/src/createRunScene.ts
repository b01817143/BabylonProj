// Tell TypeScript BABYLON exists globally (loaded via <script> tags)
declare const BABYLON: any;

// Type-only import: removed at compile time, safe for GitHub Pages
import type { SceneData } from "./interfaces.js";

export default function createRunScene(runScene: SceneData) {

  // Stash for messages shared with external scripts
  const stash: { [key: string]: string } = { message: "Empty Stash" };

  // Hook into scene lifecycle
  runScene.scene.onAfterRenderObservable.add(() => {
    // Future logic goes here
    // Example:
    // console.log("Run scene rendered!");
  });
}
