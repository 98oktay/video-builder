import FFLine from "./extends/FFLine";
import staticState from "./state";
import { makeAnimation, makePosition } from "./utils";
const { FFText, FFRect } = require("ffcreator");

const Line = (props) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Box: must be inside a Scene");
  }

  const lineWidth = props?.border?.width || props?.border;


  const [left, top] = [Math.min(props?.x, props?.x2), Math.min(props?.y, props?.y2)];
  const [right, bottom] = [Math.max(props?.x, props?.x2), Math.max(props?.y, props?.y2)];

  const width = (Math.abs(right - left)) + lineWidth;
  const height = (Math.abs(bottom - top)) + lineWidth;

  const [x, y] = [left, top];

  if (!props.color && !props.border) {
    throw new Error("Box: must have a color or border");
  }

  const box = new FFLine({
    x: x,
    y: y,
    poinst: [props.x, props.y, props.x2, props.y2],
    width,
    height,
    border: props.border,
    radius: props.radius,
    color: props.color || 'transparent',
  });

  if (props.blend) {
    box.addBlend(props.blend);
  }

  makeAnimation(box, props);

  if (currentGroup) {
    currentGroup.addChild(box);
  }

  currentScene.addChild(box);

  if (currentScene.outline) {
    const outline = new FFRect({
      width,
      height,
      x, y,
      color: 'blue',
      opacity: 0.5,
    });
    outline.setAnchor(0)
    makeAnimation(outline, props);
    currentScene.addChild(outline);
    if (currentGroup) {
      currentGroup.addChild(outline);
    }
  }

  return null;
}

export default Line;