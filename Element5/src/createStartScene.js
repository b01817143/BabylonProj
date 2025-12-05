import { Scene, ArcRotateCamera, Vector3, HemisphericLight, StandardMaterial, MeshBuilder, Texture, } from "@babylonjs/core";
function createSphere(scene) {
    let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    const material = new StandardMaterial("sphereMat", scene);
    material.diffuseTexture = new Texture("./textures/bowling.webp", scene);
    sphere.material = material;
    sphere.position.x = 0;
    sphere.position.y = 1;
    const rotationSpeed = 0.01;
    scene.registerBeforeRender(() => {
        sphere.rotation.y += rotationSpeed;
    });
    return sphere;
}
function createBox(scene) {
    let box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.x = 3;
    box.position.y = 1;
    const material = new StandardMaterial("boxMat", scene);
    material.diffuseTexture = new Texture("./textures/cardboard.jpg", scene);
    box.material = material;
    const rotationSpeed = 0.01;
    scene.registerBeforeRender(() => {
        box.rotation.y += rotationSpeed;
    });
    return box;
}
function createCylinder(scene) {
    const cylinder = MeshBuilder.CreateCylinder("cylinder", { diameter: 1, tessellation: 24 }, scene);
    cylinder.position = new Vector3(5, 1, 0);
    const material = new StandardMaterial("cylinderMat", scene);
    material.diffuseTexture = new Texture("./textures/propane.jpg", scene);
    cylinder.material = material;
    const rotationSpeed = 0.01;
    scene.registerBeforeRender(() => {
        cylinder.rotation.y += rotationSpeed;
    });
    return cylinder;
}
function createCone(scene) {
    const cone = MeshBuilder.CreateCylinder("cone", { diameterTop: 0, height: 2, tessellation: 24, arc: 0.5 }, scene);
    cone.position.x = 7;
    cone.position.y = 1;
    const material = new StandardMaterial("coneMat", scene);
    material.diffuseTexture = new Texture("./textures/road-cone.jpg", scene);
    cone.material = material;
    const rotationSpeed = 0.01;
    scene.registerBeforeRender(() => {
        cone.rotation.y += rotationSpeed;
    });
    return cone;
}
function createTriangle(scene) {
    const cone = MeshBuilder.CreateCylinder("tri", { height: 2, tessellation: 3 }, scene);
    cone.position.x = 9;
    cone.position.y = 1;
    const material = new StandardMaterial("coneMat", scene);
    material.diffuseTexture = new Texture("./textures/prism.jpg", scene);
    cone.material = material;
    const rotationSpeed = 0.01;
    scene.registerBeforeRender(() => {
        cone.rotation.y += rotationSpeed;
    });
    return cone;
}
function createLight(scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}
function createGround(scene) {
    let ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    const material = new StandardMaterial("groundMat", scene);
    material.diffuseTexture = new Texture("./textures/concrete-.jpg", scene);
    ground.material = material;
    return ground;
}
function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 2.5, camDist = 10, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}
export default function createStartScene(engine) {
    let that = { scene: new Scene(engine) };
    that.box = createBox(that.scene);
    that.sphere = createSphere(that.scene);
    that.cylinder = createCylinder(that.scene);
    that.cone = createCone(that.scene);
    that.triangle = createTriangle(that.scene);
    that.light = createLight(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
}
