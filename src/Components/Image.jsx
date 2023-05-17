import staticState from "../staticState";
import { makeAnimation, makePosition } from "../utils";
const { FFText, FFRect, FFImage } = require("ffcreator");
import path from 'path';

const Image = (props) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Image:'" + props.children + "' must be inside a Scene");
  }

  const imagePath = path.join(__dirname, './../../src/' + props.src);

  const width = props.width || (props.height * props.aspectRatio);
  const height = props.height || (props.width / props.aspectRatio);

  const position = makePosition({
    ...props,
    width,
    height,
  });


  const image = new FFImage({
    path: imagePath,
    ...position,
    width,
    height,
    scale: props.scale,
  });

  makeAnimation(image, props);

  if (currentScene.outline) {
    const outline = new FFRect({
      width: width || 1,
      height: height || 10,
      ...position,
      color: 'red',
      opacity: 0.5,
    });
    makeAnimation(outline, props);
    currentScene.addChild(outline);
  }

  currentScene.addChild(image);

  if (currentGroup) {
    currentGroup.addChild(image);
  }


  return null;
}

export default Image;