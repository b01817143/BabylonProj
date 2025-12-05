import { setText } from "./gui.js";
const collideCB = (collision) => {
    console.log("collideCB", collision.collider.transformNode.name, collision.collidedAgainst.transformNode.name);
};
const collideCB1 = (collision) => {
    console.log("collideCB1", collision.collider.transformNode.name, collision.collidedAgainst.transformNode.name);
    setText(collision.collider.transformNode.name, 1);
    setText(collision.collidedAgainst.transformNode.name, 2);
    setText(collision.point.x.toFixed(2), 3);
    setText(collision.point.z.toFixed(2), 4);
};
export function setupCollisions(sceneData) {
    var _a;
    const FILTER_GROUP_GROUND = 1;
    const FILTER_GROUP_PLATFORM = 2;
    const FILTER_GROUP_CUBE = 3;
    const FILTER_GROUP_OBSTACLE = 4;
    const FILTER_GROUP_PLAYER = 5;
    if ((_a = sceneData.ground) === null || _a === void 0 ? void 0 : _a.physicsAggregate) {
        const agg = sceneData.ground.physicsAggregate;
        agg.shape.filterMembershipMask = FILTER_GROUP_GROUND;
        agg.shape.filterCollideMask = FILTER_GROUP_CUBE | FILTER_GROUP_GROUND;
        agg.body.getCollisionObservable().add(collideCB1);
    }
    if (sceneData.box1) {
        const agg = sceneData.box1;
        agg.shape.filterMembershipMask = FILTER_GROUP_CUBE;
        agg.shape.filterCollideMask = FILTER_GROUP_CUBE | FILTER_GROUP_GROUND;
        agg.body.getCollisionObservable().add(collideCB);
    }
    if (sceneData.box2) {
        const agg = sceneData.box2;
        agg.shape.filterMembershipMask = FILTER_GROUP_CUBE;
        agg.shape.filterCollideMask = FILTER_GROUP_CUBE | FILTER_GROUP_GROUND;
        agg.body.getCollisionObservable().add(collideCB);
    }
    if (sceneData.box3) {
        const agg = sceneData.box3;
        agg.shape.filterMembershipMask = FILTER_GROUP_CUBE;
        agg.shape.filterCollideMask = FILTER_GROUP_CUBE | FILTER_GROUP_GROUND;
        agg.body.getCollisionObservable().add(collideCB);
    }
    if (sceneData.box4) {
        const agg = sceneData.box4;
        agg.shape.filterMembershipMask = FILTER_GROUP_CUBE;
        agg.shape.filterCollideMask = FILTER_GROUP_CUBE | FILTER_GROUP_GROUND;
        agg.body.getCollisionObservable().add(collideCB);
    }
}
