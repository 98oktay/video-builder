import React from "react";
import Group from "./Group";
import staticState from "./state";
import { loadFromNetwork, makeAnimation, makeBorder, makePosition, makeSize } from "./utils";
const { FFRect, FFImage } = require("ffcreator");
import path from 'path';


const Image = (props) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Image:'" + props.children + "' must be inside a Scene");
  }

  const { width, height } = makeSize(props);

  const position = makePosition({
    ...props,
    width,
    height,
  });


  let imagePath = path.join(__dirname, './../../src/' + props.src);
  let imageData = null;
  const { children, ...saltProps } = props;
  if (props.url) {
    const networkImage = loadFromNetwork(saltProps);
    imagePath = networkImage.path;
    imageData = networkImage.data;
  }

  if (props.radius || props.border) {
    const borderedImage = makeBorder(saltProps, imagePath, imageData, { width, height });
    imagePath = borderedImage.path;
  }

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

  if (props.blend) {
    image.addBlend(props.blend);
  }

  currentScene.addChild(image);

  if (currentGroup) {
    currentGroup.addChild(image);
  }


  if (props.children) {
    let { children, x, y } = props;
    const groupProps = { x, y, in: props.ins, out: props.outs, width, height };

    const parentSizes = makeSize({
      width: "100%",
      height: "100%",
    });

    if (isNaN(width)) {
      groupProps.width = parentSizes.width;
    }
    if (isNaN(height)) {
      groupProps.height = parentSizes.height;
    }

    return <Group {...groupProps}>
      {children}
    </Group>
  }


  return null;
}

export default Image;