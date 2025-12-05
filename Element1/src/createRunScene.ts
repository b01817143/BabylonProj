import type { SceneData } from "./interfaces.js";

export default function createRunScene(runScene: SceneData): void {
  // Hook for any per-frame logic in the run scene
  runScene.scene.onAfterRenderObservable.add(() => {
    // e.g. update UI, handle game state, etc.
  });
}
