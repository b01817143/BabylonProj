var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "@babylonjs/loaders";
import HavokPhysics from "@babylonjs/havok";
import { Scene, ArcRotateCamera, AssetsManager, Vector3, HemisphericLight, MeshBuilder, HavokPlugin, PhysicsAggregate, PhysicsShapeType, Color3, StandardMaterial, Texture, CubeTexture } from "@babylonjs/core";
function createLight(scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}
export function createTerrain(scene) {
    const largeGroundMat = new StandardMaterial("largeGroundMat", scene);
    largeGroundMat.diffuseTexture = new Texture("./assets/environments/valleygrass.png", scene);
    const largeGround = MeshBuilder.CreateGroundFromHeightMap("largeGround", "./assets/environments/villageheightmap.png", {
        width: 150,
        height: 150,
        subdivisions: 20,
        minHeight: 0,
        maxHeight: 10
    }, scene);
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;
    return largeGround;
}
function createGround(scene) {
    const groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new Texture("./assets/environments/playergrass.png", scene);
    groundMaterial.diffuseTexture.hasAlpha = true;
    groundMaterial.backFaceCulling = false;
    const ground = MeshBuilder.CreateGround("ground", { width: 16, height: 16 }, scene);
    ground.material = groundMaterial;
    ground.position.y = 0.01;
    const agg = new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
    ground.physicsAggregate = agg;
    return ground;
}
export function createSky(scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("./assets/textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    return skybox;
}
function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 2.5, camDist = 25, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.lowerRadiusLimit = 9;
    camera.upperRadiusLimit = 25;
    camera.lowerAlphaLimit = 0;
    camera.upperAlphaLimit = Math.PI * 2;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2.02;
    camera.attachControl(true);
    return camera;
}
function createBox1(scene) {
    let box = MeshBuilder.CreateBox("box1", { width: 1, height: 1 }, scene);
    box.position.set(-1, 3, 1);
    const texture = new StandardMaterial("reflective1", scene);
    texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
    box.material = texture;
    let boxAgg = new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 0.2, restitution: 0.1, friction: 0.4 }, scene);
    boxAgg.body.setCollisionCallbackEnabled(true);
    return boxAgg;
}
function createBox2(scene) {
    let box = MeshBuilder.CreateBox("box2", { width: 1, height: 1 }, scene);
    box.position.set(-0.7, 5, 1);
    const texture = new StandardMaterial("reflective2", scene);
    texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
    box.material = texture;
    let boxAgg = new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 0.2, restitution: 0.1, friction: 0.4 }, scene);
    boxAgg.body.setCollisionCallbackEnabled(true);
    return boxAgg;
}
function createBox3(scene) {
    let box = MeshBuilder.CreateBox("box3", { width: 1, height: 1 }, scene);
    box.position.set(-0.7, 5, 1);
    const texture = new StandardMaterial("reflective3", scene);
    texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
    box.material = texture;
    let boxAgg = new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 0.2, restitution: 0.1, friction: 0.4 }, scene);
    boxAgg.body.setCollisionCallbackEnabled(true);
    return boxAgg;
}
function createBox4(scene) {
    let box = MeshBuilder.CreateBox("box4", { width: 1, height: 1 }, scene);
    box.position.set(-0.7, 5, 1);
    const texture = new StandardMaterial("reflective4", scene);
    texture.ambientTexture = new Texture("./assets/textures/wood.jpg", scene);
    box.material = texture;
    let boxAgg = new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 0.2, restitution: 0.1, friction: 0.4 }, scene);
    boxAgg.body.setCollisionCallbackEnabled(true);
    return boxAgg;
}
function addAssets(scene) {
    const assetsManager = new AssetsManager(scene);
    const tree1 = assetsManager.addMeshTask("tree1 task", "", "./assets/nature/gltf/", "CommonTree_1.gltf");
    tree1.onSuccess = function (task) {
        const root = task.loadedMeshes[0];
        root.position = new Vector3(3, 0, 2);
        root.scaling = new Vector3(0.5, 0.5, 0.5);
        task.loadedMeshes.forEach(mesh => (mesh.isVisible = true));
        const clone = root.clone("tree1_clone", null, true);
        clone.position = new Vector3(0, 0, 5);
    };
    const tree2 = assetsManager.addMeshTask("tree2 task", "", "./assets/nature/gltf/", "CommonTree_2.gltf");
    tree2.onSuccess = function (task) {
        const root = task.loadedMeshes[0];
        root.position = new Vector3(0, 0, 2);
        root.scaling = new Vector3(0.5, 0.5, 0.5);
        const clone = root.clone("tree2_clone", null, true);
        clone.position = new Vector3(-3, 0, 5);
    };
    const tree3 = assetsManager.addMeshTask("tree3 task", "", "./assets/nature/gltf/", "CommonTree_3.gltf");
    tree3.onSuccess = function (task) {
        const root = task.loadedMeshes[0];
        root.position = new Vector3(-3, 0, 2);
        root.scaling = new Vector3(0.5, 0.5, 0.5);
        const clone = root.clone("tree3_clone", null, true);
        clone.position = new Vector3(3, 0, 5);
    };
    const tree4 = assetsManager.addMeshTask("tree4 task", "", "./assets/nature/gltf/", "CommonTree_1.gltf");
    tree4.onSuccess = function (task) {
        const root = task.loadedMeshes[0];
        root.position = new Vector3(3, 0, -2);
        root.scaling = new Vector3(0.5, 0.5, 0.5);
        const clone = root.clone("tree4_clone", null, true);
        clone.position = new Vector3(0, 0, -5);
    };
    const tree5 = assetsManager.addMeshTask("tree5 task", "", "./assets/nature/gltf/", "CommonTree_2.gltf");
    tree5.onSuccess = function (task) {
        const root = task.loadedMeshes[0];
        root.position = new Vector3(0, 0, -2);
        root.scaling = new Vector3(0.5, 0.5, 0.5);
        const clone = root.clone("tree5_clone", null, true);
        clone.position = new Vector3(-3, 0, -5);
    };
    const tree6 = assetsManager.addMeshTask("tree6 task", "", "./assets/nature/gltf/", "CommonTree_3.gltf");
    tree6.onSuccess = function (task) {
        const root = task.loadedMeshes[0];
        root.position = new Vector3(-3, 0, -2);
        root.scaling = new Vector3(0.5, 0.5, 0.5);
        const clone = root.clone("tree6_clone", null, true);
        clone.position = new Vector3(3, 0, -5);
    };
    assetsManager.onTaskErrorObservable.add(task => console.log("task failed", task.errorObject.message));
    return assetsManager;
}
export default function createStartScene(engine) {
    return __awaiter(this, void 0, void 0, function* () {
        let that = { scene: new Scene(engine) };
        const havokInstance = yield HavokPhysics();
        const hk = new HavokPlugin(true, havokInstance);
        that.scene.enablePhysics(new Vector3(0, -9.81, 0), hk);
        that.skybox = createSky(that.scene);
        that.light = createLight(that.scene);
        that.ground = createGround(that.scene);
        createTerrain(that.scene);
        that.camera = createArcRotateCamera(that.scene);
        that.box1 = createBox1(that.scene);
        that.box2 = createBox2(that.scene);
        that.box3 = createBox3(that.scene);
        that.box4 = createBox4(that.scene);
        const assetsManager = addAssets(that.scene);
        assetsManager.load();
        return that;
    });
}
