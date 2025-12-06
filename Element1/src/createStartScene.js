function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}
export function createTerrain(scene) {
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat", scene);
    largeGroundMat.diffuseTexture = new BABYLON.Texture("./assets/environments/valleygrass.png", scene);
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "./assets/environments/villageheightmap.png", {
        width: 150,
        height: 150,
        subdivisions: 20,
        minHeight: 0,
        maxHeight: 10,
    }, scene);
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;
    return largeGround;
}
function createGround(scene) {
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/environments/playergrass.png", scene);
    groundMaterial.diffuseTexture.hasAlpha = true;
    groundMaterial.backFaceCulling = false;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 16, height: 16 }, scene);
    ground.material = groundMaterial;
    ground.position.y = 0.01;
    return ground;
}
export function createSky(scene) {
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    return skybox;
}
function createArcRotateCamera(scene) {
    const camAlpha = -Math.PI / 2;
    const camBeta = Math.PI / 2.5;
    const camDist = 10;
    const camTarget = new BABYLON.Vector3(0, 0, 0);
    const camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}
function addAssets(scene) {
    const assetsManager = new BABYLON.AssetsManager(scene);
    const tree1 = assetsManager.addMeshTask("tree1 task", "", "./assets/nature/", "CommonTree_1.gltf");
    tree1.onSuccess = function (task) {
        task.loadedMeshes[0].position = new BABYLON.Vector3(3, 0, 2);
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        const tree1Clone = task.loadedMeshes[0].clone("tree1_clone", null);
        if (tree1Clone) {
            tree1Clone.position = new BABYLON.Vector3(0, 0, 5);
        }
    };
    const tree2 = assetsManager.addMeshTask("tree2 task", "", "./assets/nature/", "CommonTree_2.gltf");
    tree2.onSuccess = function (task) {
        task.loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 2);
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        const tree2Clone = task.loadedMeshes[0].clone("tree2_clone", null);
        if (tree2Clone) {
            tree2Clone.position = new BABYLON.Vector3(-3, 0, 5);
        }
    };
    const tree3 = assetsManager.addMeshTask("tree3 task", "", "./assets/nature/", "CommonTree_3.gltf");
    tree3.onSuccess = function (task) {
        task.loadedMeshes[0].position = new BABYLON.Vector3(-3, 0, 2);
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        const tree3Clone = task.loadedMeshes[0].clone("tree3_clone", null);
        if (tree3Clone) {
            tree3Clone.position = new BABYLON.Vector3(3, 0, 5);
        }
    };
    assetsManager.onTaskErrorObservable.add(function (task) {
        console.log("task failed", task.errorObject.message, task.errorObject.exception);
    });
    return assetsManager;
}
export default function createStartScene(engine) {
    const that = {
        scene: new BABYLON.Scene(engine),
    };
    that.skybox = createSky(that.scene);
    that.light = createLight(that.scene);
    that.ground = createGround(that.scene);
    createTerrain(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    const assetsManager = addAssets(that.scene);
    assetsManager.load();
    return that;
}
