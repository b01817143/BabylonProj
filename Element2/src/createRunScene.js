export default function createRunScene(runScene) {
    var stash = { message: "Empty Stash" };
    runScene.scene.onAfterRenderObservable.add(() => { });
}
