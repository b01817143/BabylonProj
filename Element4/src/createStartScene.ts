// createstartscene.ts

// Global Babylon from script tags
declare const BABYLON: any;

// Type-only imports: removed from JS output (safe for GitHub Pages)
import type {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  HemisphericLight,
  Color3,
  Engine,
  Texture,
  CubeTexture,
  Nullable,
  Vector4,
  InstancedMesh,
  SpriteManager,
  Sprite,
} from "@babylonjs/core";

import type { SceneData } from "./interfaces.js";

// ----------------------------------------------------
// TERRAIN
// ----------------------------------------------------

function createTerrain(scene: Scene) {
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
}

// ----------------------------------------------------
// GROUND
// ----------------------------------------------------

function createGround(scene: Scene) {
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture(
    "./assets/environments/villagegreen.png",
    scene
  );
  groundMaterial.diffuseTexture.hasAlpha = true;
  groundMaterial.backFaceCulling = false;

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 24, height: 24 },
    scene
  );
  ground.material = groundMaterial;
  ground.position.y = 0.01;

  return ground;
}

// ----------------------------------------------------
// SKY
// ----------------------------------------------------

function createSky(scene: Scene) {
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

// ----------------------------------------------------
// HOUSES (box + roof)
// ----------------------------------------------------

function createBox(style: number) {
  // style 1 small, style 2 semi-detached
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  const faceUV: Vector4[] = [];

  if (style === 1) {
    boxMat.diffuseTexture = new BABYLON.Texture(
      "./assets/textures/cubehouse.png"
    );
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); // rear
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); // front
    faceUV[2] = new BABYLON.Vector4(0.25, 0.0, 0.5, 1.0); // right
    faceUV[3] = new BABYLON.Vector4(0.75, 0.0, 1.0, 1.0); // left
  } else {
    boxMat.diffuseTexture = new BABYLON.Texture(
      "./assets/textures/semihouse.png"
    );
    faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); // rear
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); // front
    faceUV[2] = new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0); // right
    faceUV[3] = new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0); // left
  }

  const box = BABYLON.MeshBuilder.CreateBox("box", {
    width: style,
    height: 1,
    faceUV,
    wrap: true,
  });

  box.position = new BABYLON.Vector3(0, 0.5, 0);
  box.scaling = new BABYLON.Vector3(1, 1, 1);
  box.material = boxMat;

  return box;
}

function createRoof(style: number) {
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3,
  });

  roof.scaling.x = 0.75;
  roof.scaling.y = style * 0.85;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("./assets/textures/roof.jpg");
  roof.material = roofMat;

  return roof;
}

function createHouse(scene: Scene, style: number) {
  const box = createBox(style);
  const roof = createRoof(style);

  const house = BABYLON.Mesh.MergeMeshes(
    [box, roof],
    true,
    false,
    undefined,
    false,
    true
  );
  return house;
}

function createHouses(scene: Scene, style: number) {
  if (style === 1) {
    createHouse(scene, 1);
    return;
  }

  if (style === 2) {
    createHouse(scene, 2);
    return;
  }

  if (style === 3) {
    const houses: Nullable<Mesh>[] = [];

    houses[0] = createHouse(scene, 1);
    houses[0]!.rotation.y = -Math.PI / 16;
    houses[0]!.position.x = -6.8;
    houses[0]!.position.z = 2.5;

    houses[1] = createHouse(scene, 2);
    houses[1]!.rotation.y = -Math.PI / 16;
    houses[1]!.position.x = -4.5;
    houses[1]!.position.z = 3;

    const ihouses: InstancedMesh[] = [];
    const places: number[][] = [];

    places.push([2, -Math.PI / 16, -1.5, 4]);
    places.push([2, -Math.PI / 3, 1.5, 6]);
    places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
    places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
    places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
    places.push([1, (5 * Math.PI) / 4, 0, -1]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
    places.push([2, Math.PI / 1.9, 4.75, -1]);
    places.push([1, Math.PI / 1.95, 4.5, -3]);
    places.push([2, Math.PI / 1.9, 4.75, -5]);
    places.push([1, Math.PI / 1.9, 4.75, -7]);
    places.push([2, -Math.PI / 3, 5.25, 2]);
    places.push([1, -Math.PI / 3, 6, 4]);

    for (let i = 0; i < places.length; i++) {
      if (places[i][0] === 1) {
        ihouses[i] = houses[0]!.createInstance("house" + i);
      } else {
        ihouses[i] = houses[1]!.createInstance("house" + i);
      }
      ihouses[i].rotation.y = places[i][1];
      ihouses[i].position.x = places[i][2];
      ihouses[i].position.z = places[i][3];
    }
  }
}

// ----------------------------------------------------
// TREES (sprites)
// ----------------------------------------------------

function createTrees(scene: Scene) {
  const spriteManagerTrees: SpriteManager = new BABYLON.SpriteManager(
    "treesManager",
    "./assets/sprites/tree.png",
    2000,
    { width: 512, height: 1024 },
    scene
  );

  for (let i = 0; i < 500; i++) {
    const tree: Sprite = new BABYLON.Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * -30;
    tree.position.z = Math.random() * 20 + 8;
    tree.position.y = 0.2;
  }

  for (let i = 0; i < 500; i++) {
    const tree: Sprite = new BABYLON.Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * 30;
    tree.position.z = Math.random() * 20 + 8;
    tree.position.y = 0.2;
  }

  for (let i = 0; i < 500; i++) {
    const tree: Sprite = new BABYLON.Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * -30;
    tree.position.z = Math.random() * -50 + -3;
    tree.position.y = 0.2;
  }

  for (let i = 0; i < 500; i++) {
    const tree: Sprite = new BABYLON.Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * 90;
    tree.position.z = Math.random() * -25 + 5;
    tree.position.y = 0.2;
  }
}

// ----------------------------------------------------
// LIGHT + CAMERA
// ----------------------------------------------------

function createHemisphericLight(scene: Scene) {
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(2, 1, 0),
    scene
  );
  light.intensity = 50.8;
  light.diffuse = new BABYLON.Color3(1, 1, 1);
  light.specular = new BABYLON.Color3(1, 0.8, 0.8);
  light.groundColor = new BABYLON.Color3(0, 0.2, 0.7);
  return light;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 25,
    camTarget = new BABYLON.Vector3(0, 0, 0);

  const camera: ArcRotateCamera = new BABYLON.ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );

  camera.lowerRadiusLimit = 9;
  camera.upperRadiusLimit = 25;
  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = Math.PI * 2;
  camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = Math.PI / 2.02;

  camera.attachControl(true);
  return camera;
}

// ----------------------------------------------------
// MAIN SCENE CREATION
// ----------------------------------------------------

export default function createStartScene(engine: Engine): SceneData {
  const scene: Scene = new BABYLON.Scene(engine);

  const ground = createGround(scene);
  const sky = createSky(scene);
  const lightHemispheric = createHemisphericLight(scene);

  createHouses(scene, 3);
  createTrees(scene);
  createTerrain(scene);
  const camera = createArcRotateCamera(scene);

  const that: SceneData = {
    scene,
    ground,
    sky,
    lightHemispheric,
    camera,
  };

  return that;
}
