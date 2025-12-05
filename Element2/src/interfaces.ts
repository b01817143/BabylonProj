// interfaces.ts

// Tell TS this exists at runtime
declare const BABYLON: any;

// Type-only imports for editor IntelliSense (removed after compile)
import type {
  Scene,
  Camera,
  HemisphericLight,
  Mesh,
  PhysicsAggregate
} from "@babylonjs/core";

export interface PhysicsMesh extends Mesh {
  physicsAggregate?: PhysicsAggregate;
}

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
