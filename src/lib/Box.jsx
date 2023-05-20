import FFBox from "./extends/FFBox";
import staticState from "./state";
import { makeAnimation, makePosition } from "./utils";
const { FFText, FFRect } = require("ffcreator");

const Box = (props) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Box: must be inside a Scene");
  }

  const position = makePosition({
    ...props,
    width: props.width || 10,
    height: props.height || 10
  });

  if(!props.color && !props.border) {
    throw new Error("Box: must have a color or border");
  }

  const box = new FFBox({
    width: props.width || 10,
    border: props.border,
    radius: props.radius,
    height: props.height || 10,
    color: props.color || 'transparent',
    ...position,
  });

  if(props.blend) {
    box.addBlend(props.blend);
  }

  makeAnimation(box, props);

  if (currentGroup) {    
    const bounds = currentGroup.getBounds();
      if(bounds.width && !props.wrap) {
        text.setWrap(bounds.width);
      }
    currentGroup.addChild(box);
  }

  currentScene.addChild(box);

  if (currentScene.outline) {
    const outline = new FFRect({
      width: props.width || 10,
      height: props.height || 10,
      ...position,
      color: 'red',
      opacity: 0.5,
    });
    makeAnimation(outline, props);
    currentScene.addChild(outline);
    if (currentGroup) {
      currentGroup.addChild(outline);
    }
  }

  return null;
}

export default Box;