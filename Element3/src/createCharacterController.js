export function createCharacterController(scene) {
    var _a;
    let characterState = "ON_GROUND";
    const inAirSpeed = 8.0;
    const onGroundSpeed = 10;
    const jumpHeight = 1.5;
    const characterGravity = new BABYLON.Vector3(0, -18, 0);
    let keyInput = new BABYLON.Vector3(0, 0, 0);
    let wantJump = false;
    let characterOrientation = BABYLON.Quaternion.Identity();
    let forwardLocalSpace = new BABYLON.Vector3(0, 0, 1);
    const h = 1.8;
    const r = 0.6;
    let displayCapsule = BABYLON.MeshBuilder.CreateCapsule("CharacterDisplay", { height: h, radius: r }, scene);
    displayCapsule.position = new BABYLON.Vector3(0, h / 2, 0);
    const capsuleMat = new BABYLON.StandardMaterial("capsuleMat", scene);
    capsuleMat.diffuseColor = new BABYLON.Color3(0.1, 0.7, 0.4);
    capsuleMat.emissiveColor = new BABYLON.Color3(0.3, 0.1, 0.1);
    displayCapsule.material = capsuleMat;
    console.log("Capsule initial position:", displayCapsule.position);
    let characterController = new BABYLON.PhysicsCharacterController(displayCapsule.position.clone(), { capsuleHeight: h, capsuleRadius: r }, scene);
    const getDesiredVelocity = function (deltaTime, supportInfo, currentVelocity) {
        if (characterState === "ON_GROUND" &&
            supportInfo.supportedState !== BABYLON.CharacterSupportedState.SUPPORTED) {
            characterState = "IN_AIR";
        }
        else if (characterState === "IN_AIR" &&
            supportInfo.supportedState === BABYLON.CharacterSupportedState.SUPPORTED) {
            characterState = "ON_GROUND";
        }
        if (characterState === "ON_GROUND" && wantJump) {
            characterState = "START_JUMP";
        }
        else if (characterState === "START_JUMP") {
            characterState = "IN_AIR";
        }
        let upWorld = characterGravity.normalizeToNew();
        upWorld.scaleInPlace(-1.0);
        let forwardWorld = forwardLocalSpace.applyRotationQuaternion(characterOrientation);
        if (characterState === "IN_AIR") {
            let desiredVelocity = keyInput
                .scale(inAirSpeed)
                .applyRotationQuaternion(characterOrientation);
            let outputVelocity = characterController.calculateMovement(deltaTime, forwardWorld, upWorld, currentVelocity, BABYLON.Vector3.ZeroReadOnly, desiredVelocity, upWorld);
            outputVelocity.addInPlace(upWorld.scale(-outputVelocity.dot(upWorld)));
            outputVelocity.addInPlace(upWorld.scale(currentVelocity.dot(upWorld)));
            outputVelocity.addInPlace(characterGravity.scale(deltaTime));
            return outputVelocity;
        }
        else if (characterState === "ON_GROUND") {
            let desiredVelocity = keyInput
                .scale(onGroundSpeed)
                .applyRotationQuaternion(characterOrientation);
            let outputVelocity = characterController.calculateMovement(deltaTime, forwardWorld, supportInfo.averageSurfaceNormal, currentVelocity, supportInfo.averageSurfaceVelocity, desiredVelocity, upWorld);
            outputVelocity.subtractInPlace(supportInfo.averageSurfaceVelocity);
            let inv1k = 1e-3;
            if (outputVelocity.dot(upWorld) > inv1k) {
                let velLen = outputVelocity.length();
                outputVelocity.normalizeFromLength(velLen);
                let horizLen = velLen /
                    supportInfo.averageSurfaceNormal.dot(upWorld);
                let c = supportInfo.averageSurfaceNormal.cross(outputVelocity);
                outputVelocity = c.cross(upWorld);
                outputVelocity.scaleInPlace(horizLen);
            }
            outputVelocity.addInPlace(supportInfo.averageSurfaceVelocity);
            return outputVelocity;
        }
        else if (characterState === "START_JUMP") {
            let u = Math.sqrt(2 * characterGravity.length() * jumpHeight);
            let curRelVel = currentVelocity.dot(upWorld);
            return currentVelocity.add(upWorld.scale(u - curRelVel));
        }
        return BABYLON.Vector3.Zero();
    };
    scene.onBeforeRenderObservable.add(() => {
        displayCapsule.position.copyFrom(characterController.getPosition());
    });
    (_a = scene.onAfterPhysicsObservable) === null || _a === void 0 ? void 0 : _a.add(() => {
        if (scene.deltaTime === undefined)
            return;
        let dt = scene.deltaTime / 1000.0;
        if (dt === 0)
            return;
        let down = new BABYLON.Vector3(0, -1, 0);
        let support = characterController.checkSupport(dt, down);
        let desiredLinearVelocity = getDesiredVelocity(dt, support, characterController.getVelocity());
        characterController.setVelocity(desiredLinearVelocity);
        characterController.integrate(dt, support, characterGravity);
    });
    scene.onKeyboardObservable.add((kbInfo) => {
        const key = kbInfo.event.key;
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if (key === "w" || key === "ArrowUp") {
                    keyInput.z = 1;
                }
                else if (key === "s" || key === "ArrowDown") {
                    keyInput.z = -1;
                }
                else if (key === "a" || key === "ArrowLeft") {
                    keyInput.x = -1;
                }
                else if (key === "d" || key === "ArrowRight") {
                    keyInput.x = 1;
                }
                else if (key === " ") {
                    wantJump = true;
                }
                break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                if (key === "w" ||
                    key === "s" ||
                    key === "ArrowUp" ||
                    key === "ArrowDown") {
                    keyInput.z = 0;
                }
                if (key === "a" ||
                    key === "d" ||
                    key === "ArrowLeft" ||
                    key === "ArrowRight") {
                    keyInput.x = 0;
                }
                if (key === " ") {
                    wantJump = false;
                }
                break;
        }
    });
    return { controller: characterController, mesh: displayCapsule };
}
