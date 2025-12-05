// Element1/src/createStartScene.ts
// Uses global BABYLON namespace provided by the Babylon CDN scripts in index.html.
//
// index.html must include (before your index.js):
// <script src="https://cdn.babylonjs.com/babylon.js"></script>
// <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
// <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>

// Let TypeScript know there is a global BABYLON available at runtime.
declare const BABYLON: any;

import type {
  Scene,
  ArcRotateCamera,
  AssetsManager,
  Vector3,
  HemisphericLight,
  Mesh,
  Camera,
  Engine,
  Texture,
  StandardMaterial,
  CubeTexture,
  Color3,
} from "@babylonjs/core";

import type { SceneData } from "./interfaces.js";

// LIGHT
function createLight(scene: Scene): HemisphericLight {
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;
  return light;
}

// TERRAIN
export function createTerrain(scene: Scene): Mesh {
  const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat", scene);
  largeGroundMat.diffuseTexture = new BABYLON.Texture(
    "./assets/environments/valleygrass.png",
    scene
  );

  const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    "largeGround",
    "./assets/environments/villageheightmap.png",
    {
      width: 150,
      height: 150,
      subdivisions: 20,
      minHeight: 0,
      maxHeight: 10,
    },
    scene
  );

  largeGround.material = largeGroundMat;
  largeGround.position.y = -0.01;

  return largeGround;
}

// SMALL GROUND PLANE
function createGround(scene: Scene): Mesh {
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture(
    "./assets/environments/playergrass.png",
    scene
  );
  groundMaterial.diffuseTexture.hasAlpha = true;
  groundMaterial.backFaceCulling = false;

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 16, height: 16 },
    scene
  );
  ground.material = groundMaterial;
  ground.position.y = 0.01;

  return ground;
}

// SKYBOX
export function createSky(scene: Scene): Mesh {
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);

  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;

  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "./assets/textures/skybox/skybox",
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;

  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  skybox.material = skyboxMaterial;

  return skybox;
}

// CAMERA
function createArcRotateCamera(scene: Scene): ArcRotateCamera {
  const camAlpha = -Math.PI / 2;
  const camBeta = Math.PI / 2.5;
  const camDist = 10;
  const camTarget = new BABYLON.Vector3(0, 0, 0);

  const camera = new BABYLON.ArcRotateCamera(
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

// ASSETS
function addAssets(scene: Scene): AssetsManager {
  const assetsManager = new BABYLON.AssetsManager(scene);

  const tree1 = assetsManager.addMeshTask(
    "tree1 task",
    "",
    "./assets/nature/gltf/",
    "CommonTree_1.gltf"
  );
  tree1.onSuccess = function (task) {
    task.loadedMeshes[0].position = new BABYLON.Vector3(3, 0, 2);
    task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    // Clone tree1
    const tree1Clone = task.loadedMeshes[0].clone("tree1_clone", null);
    if (tree1Clone) {
      tree1Clone.position = new BABYLON.Vector3(0, 0, 5);
    }
  };

  const tree2 = assetsManager.addMeshTask(
    "tree2 task",
    "",
    "./assets/nature/gltf/",
    "CommonTree_2.gltf"
  );
  tree2.onSuccess = function (task) {
    task.loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 2);
    task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    // Clone tree2
    const tree2Clone = task.loadedMeshes[0].clone("tree2_clone", null);
    if (tree2Clone) {
      tree2Clone.position = new BABYLON.Vector3(-3, 0, 5);
    }
  };

  const tree3 = assetsManager.addMeshTask(
    "tree3 task",
    "",
    "./assets/nature/gltf/",
    "CommonTree_3.gltf"
  );
  tree3.onSuccess = function (task) {
    task.loadedMeshes[0].position = new BABYLON.Vector3(-3, 0, 2);
    task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    // Clone tree3
    const tree3Clone = task.loadedMeshes[0].clone("tree3_clone", null);
    if (tree3Clone) {
      tree3Clone.position = new BABYLON.Vector3(3, 0, 5);
    }
  };

  assetsManager.onTaskErrorObservable.add(function (task) {
    console.log(
      "task failed",
      task.errorObject.message,
      task.errorObject.exception
    );
  });

  return assetsManager;
}

// ENTRY: CREATE START SCENE
export default function createStartScene(engine: Engine): SceneData {
  const that: SceneData = {
    scene: new BABYLON.Scene(engine),
  };

  // that.scene.debugLayer.show();

  that.skybox = createSky(that.scene);
  that.light = createLight(that.scene);
  that.ground = createGround(that.scene);
  createTerrain(that.scene);
  that.camera = createArcRotateCamera(that.scene);

  const assetsManager = addAssets(that.scene);
  assetsManager.load();

  return that;
}
