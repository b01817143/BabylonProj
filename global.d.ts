// global.d.ts
// Make TypeScript aware of the global BABYLON namespace that comes from the CDN script.

import type * as BABYLONCore from "@babylonjs/core";

/**
 * Declare a global BABYLON variable whose shape matches @babylonjs/core.
 * This is erased at runtime and only used for type-checking.
 */
declare const BABYLON: typeof BABYLONCore;
