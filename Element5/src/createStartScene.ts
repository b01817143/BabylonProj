// createstartscene.ts (Element5)

// Global BabylonJS from script tag
declare const BABYLON: any;

// Type-only imports (no JS emitted → safe for GitHub Pages)
import type {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  MeshBuilder,
  Mesh,
  Light,
  Camera,
  Texture,
  Engine,
} from "@babylonjs/core";

function createSphere(scene: Scene) {
  const sphere: Mesh = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );

  const material: StandardMaterial = new BABYLON.StandardMaterial(
    "sphereMat",
    scene
  );
  material.diffuseTexture = new BABYLON.Texture(
    "./textures/bowling.webp",
    scene
  );
  sphere.material = material;

  sphere.position.x = 0;
  sphere.position.y = 1;

  const rotationSpeed = 0.01;
  scene.registerBeforeRender(() => {
    sphere.rotation.y += rotationSpeed;
  });

  return sphere;
}

function createBox(scene: Scene) {
  const box: Mesh = BABYLON.MeshBuilder.CreateBox(
    "box",
    { size: 1 },
    scene
  );
  box.position.x = 3;
  box.position.y = 1;

  const material: StandardMaterial = new BABYLON.StandardMaterial(
    "boxMat",
    scene
  );
  material.diffuseTexture = new BABYLON.Texture(
    "./textures/cardboard.jpg",
    scene
  );
  box.material = material;

  const rotationSpeed = 0.01;
  scene.registerBeforeRender(() => {
    box.rotation.y += rotationSpeed;
  });

  return box;
}

function createCylinder(scene: Scene) {
  const cylinder: Mesh = BABYLON.MeshBuilder.CreateCylinder(
    "cylinder",
    { diameter: 1, tessellation: 24 },
    scene
  );

  cylinder.position = new BABYLON.Vector3(5, 1, 0);

  const material: StandardMaterial = new BABYLON.StandardMaterial(
    "cylinderMat",
    scene
  );
  material.diffuseTexture = new BABYLON.Texture(
    "./textures/propane.jpg",
    scene
  );
  cylinder.material = material;

  const rotationSpeed = 0.01;
  scene.registerBeforeRender(() => {
    cylinder.rotation.y += rotationSpeed;
  });

  return cylinder;
}

function createCone(scene: Scene) {
  const cone: Mesh = BABYLON.MeshBuilder.CreateCylinder(
    "cone",
    { diameterTop: 0, height: 2, tessellation: 24, arc: 0.5 },
    scene
  );
  cone.position.x = 7;
  cone.position.y = 1;

  const material: StandardMaterial = new BABYLON.StandardMaterial(
    "coneMat",
    scene
  );
  material.diffuseTexture = new BABYLON.Texture(
    "./textures/road-cone.jpg",
    scene
  );
  cone.material = material;

  const rotationSpeed = 0.01;
  scene.registerBeforeRender(() => {
    cone.rotation.y += rotationSpeed;
  });

  return cone;
}

function createTriangle(scene: Scene) {
  const tri: Mesh = BABYLON.MeshBuilder.CreateCylinder(
    "tri",
    { height: 2, tessellation: 3 },
    scene
  );
  tri.position.x = 9;
  tri.position.y = 1;

  const material: StandardMaterial = new BABYLON.StandardMaterial(
    "coneMat",
    scene
  );
  material.diffuseTexture = new BABYLON.Texture(
    "./textures/prism.jpg",
    scene
  );
  tri.material = material;

  const rotationSpeed = 0.01;
  scene.registerBeforeRender(() => {
    tri.rotation.y += rotationSpeed;
  });

  return tri;
}

function createLight(scene: Scene) {
  const light: HemisphericLight = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;
  return light;
}

function createGround(scene: Scene) {
  const ground: Mesh = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );

  const material: StandardMaterial = new BABYLON.StandardMaterial(
    "groundMat",
    scene
  );
  material.diffuseTexture = new BABYLON.Texture(
    "./textures/concrete-.jpg",
    scene
  );
  ground.material = material;

  return ground;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new BABYLON.Vector3(0, 0, 0);

  const camera: ArcRotateCamera = new BABYLON.ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {
  interface SceneData {
    scene: Scene;
    box?: Mesh;
    sphere?: Mesh;
    cylinder?: Mesh;
    cone?: Mesh;
    triangle?: Mesh;
    light?: Light;
    ground?: Mesh;
    camera?: Camera;
  }

  const scene: Scene = new BABYLON.Scene(engine);

  const that: SceneData = { scene };

  that.box = createBox(scene);
  that.sphere = createSphere(scene);
  that.cylinder = createCylinder(scene);
  that.cone = createCone(scene);
  that.triangle = createTriangle(scene);
  that.light = createLight(scene);
  that.ground = createGround(scene);
  that.camera = createArcRotateCamera(scene);

  return that;
}
