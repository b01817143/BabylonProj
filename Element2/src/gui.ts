// Tell TypeScript these globals exist at runtime (from <script> tags)
declare const BABYLON: any;

// Type-only imports (for IntelliSense only, removed in JS output)
import type { Scene } from "@babylonjs/core";
import type {
  Button,
  AdvancedDynamicTexture,
  TextBlock,
  Control,
  Grid,
  Rectangle,
} from "@babylonjs/gui/2D";

var text1!: TextBlock; // receives external messages
var text2!: TextBlock;
var text3!: TextBlock;
var text4!: TextBlock;
var heading1!: TextBlock;

function createSceneButton(
  name: string,
  index: string,
  x: string,
  y: string
) {
  const button: Button = BABYLON.GUI.Button.CreateSimpleButton(name, index);
  button.left = x;
  button.top = y;
  button.width = "180px";
  button.height = "35px";
  button.color = "white";
  button.cornerRadius = 20;
  button.background = "green";

  button.onPointerClickObservable.add(() => {
    console.log("click event");
    const toggle: string =
      button.textBlock!.text === "clicked" ? "Click me!" : "clicked";
    button.textBlock!.text = toggle;
    console.log(toggle);
  });

  return button;
}

function createTextBlock(
  name: string,
  index: string,
  left: string,
  top: string
) {
  const text: TextBlock = new BABYLON.GUI.TextBlock(name, index);
  text.text = index;
  text.color = "white";
  text.fontSize = 24;
  text.left = left;
  text.top = top;
  text.width = "200px";
  text.height = "46px";
  text.fontFamily = "Verdana";
  text.textWrapping = true;
  text.highlightColor = "red";

  // Use Control’s alignment constants from the global GUI namespace
  text.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  text.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

  // event handling
  text.onPointerEnterObservable.add(() => {
    text.isHighlighted = true;
  });
  text.onPointerOutObservable.add(() => {
    text.isHighlighted = false;
  });

  return text;
}

export function gui(scene: Scene): void {
  // Fullscreen GUI
  const advancedTexture: AdvancedDynamicTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true, scene);

  const button1: Button = createSceneButton(
    "button1",
    "Click Me!",
    "0px",
    "0px"
  );

  // High-resolution GUI text
  scene.getEngine().setHardwareScalingLevel(1 / window.devicePixelRatio);
  advancedTexture.rootContainer.scaleX = window.devicePixelRatio;
  advancedTexture.rootContainer.scaleY = window.devicePixelRatio;

  heading1 = createTextBlock("heading1", "Hello World", "1px", "1px");
  text1 = createTextBlock("text1", "Debug", "1px", "1px");
  text2 = createTextBlock("text2", "Debug", "1px", "1px");
  text3 = createTextBlock("text3", "Debug", "1px", "1px");
  text4 = createTextBlock("text4", "Debug", "1px", "1px");

  // Grid-based layout
  const grid: Grid = new BABYLON.GUI.Grid();
  grid.addColumnDefinition(100, true);
  grid.addColumnDefinition(0.25);
  grid.addColumnDefinition(0.25);
  grid.addColumnDefinition(0.25);
  grid.addColumnDefinition(0.25);
  grid.addColumnDefinition(100, true);
  grid.addRowDefinition(50, true);
  grid.addRowDefinition(50, true);

  const rect1: Rectangle = new BABYLON.GUI.Rectangle();
  rect1.background = "#76d56e88";
  rect1.thickness = 0;
  rect1.addControl(heading1);

  const rect2: Rectangle = new BABYLON.GUI.Rectangle();
  rect2.background = "#60955b88";
  rect2.thickness = 0;
  rect2.addControl(button1);

  const rect3: Rectangle = new BABYLON.GUI.Rectangle();
  rect3.background = "#76d56e88";
  rect3.thickness = 0;

  const rect4: Rectangle = new BABYLON.GUI.Rectangle();
  rect4.background = "#60955b88";
  rect4.thickness = 0;

  const rect5: Rectangle = new BABYLON.GUI.Rectangle();
  rect5.background = "#76d56e88";
  rect5.thickness = 0;
  rect5.addControl(text1);

  const rect6: Rectangle = new BABYLON.GUI.Rectangle();
  rect6.background = "#60955b88";
  rect6.thickness = 0;
  rect6.addControl(text2);

  const rect7: Rectangle = new BABYLON.GUI.Rectangle();
  rect7.background = "#76d56e88";
  rect7.thickness = 0;
  rect7.addControl(text3);

  const rect8: Rectangle = new BABYLON.GUI.Rectangle();
  rect8.background = "#60955b88";
  rect8.thickness = 0;
  rect8.addControl(text4);

  grid.addControl(rect1, 0, 1);
  grid.addControl(rect2, 0, 2);
  grid.addControl(rect3, 0, 3);
  grid.addControl(rect4, 0, 4);
  grid.addControl(rect5, 1, 1);
  grid.addControl(rect6, 1, 2);
  grid.addControl(rect7, 1, 3);
  grid.addControl(rect8, 1, 4);

  advancedTexture.addControl(grid);

  scene.registerBeforeRender(() => {
    // Example external data hooking (left commented out as in your original)
    // const mystash = scene.getExternalData("stash") as { [key: string]: string };
    // try { text1.text = mystash.message; } catch {}
    // try { text2.text = mystash.x; } catch {}
    // try { text3.text = mystash.z; } catch {}
  });
}

export function setText(newtext: string, index: number) {
  switch (index) {
    case 1:
      text1.text = newtext;
      break;
    case 2:
      text2.text = newtext;
      break;
    case 3:
      text3.text = newtext;
      break;
    case 4:
      text4.text = newtext;
      break;
    default:
      break;
  }
}
