// interfaces.ts

// Type-only imports → they disappear from compiled JS
import type { Scene, Camera, HemisphericLight, Mesh } from "@babylonjs/core";
import type { PhysicsAggregate } from "@babylonjs/core";

// A mesh that may include a physicsAggregate property
export interface PhysicsMesh extends Mesh {
  physicsAggregate?: PhysicsAggregate;
}

// Data container shared between scenes/files
export interface SceneData {
  scene: Scene;
  light?: HemisphericLight;
  ground?: PhysicsMesh;
  camera?: Camera;
  box1?: PhysicsAggregate;
  box2?: PhysicsAggregate;
  box3?: PhysicsAggregate;
  box4?: PhysicsAggregate;
  skybox?: Mesh;
}


