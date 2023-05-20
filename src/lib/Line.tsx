import { FFRect, AblendTypes } from "ffcreator";
import FFLine from "./extends/FFLine";
import staticState from "./state";
import { makeAnimation } from "./utils";

type LineProps = {
  x: number,
  y: number,
  x2: number,
  y2: number,
  color?: string | string[],
  border?: string | number | { width: number, color: string },
  radius?: number | number[],
  blend?: string,
  children?: any,
  in?: any,
  out?: any,
}

const Line = (props: LineProps) => {
  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Line: must be inside a Scene");
  }

  const lineWidth = typeof props.border === 'number' ? props.border : typeof props.border === 'object' ? props.border.width : 0;

  const [left, top] = [Math.min(props?.x || 0, props?.x2 || 0), Math.min(props?.y || 0, props?.y2 || 0)];
  const [right, bottom] = [Math.max(props?.x || 0, props?.x2 || 0), Math.max(props?.y || 0, props?.y2 || 0)];

  const width = (Math.abs(right - left)) + lineWidth;
  const height = (Math.abs(bottom - top)) + lineWidth;

  const [x, y] = [left, top];

  if (!props.color && !props.border) {
    throw new Error("Line: must have a color or border");
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
    box.addBlend(props.blend as AblendTypes);
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