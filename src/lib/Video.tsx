import React from "react";
import Group, { GroupProps } from "./Group";
import staticState from "./state";
import { makeAnimation, makePosition, makeSize } from "./utils";
const { FFRect, FFVideo } = require("ffcreator");
import path from 'path';


type VideoProps = {
  x?: number,
  y?: number,
  width?: string | number,
  height?: string | number,
  src?: string,
  scale?: number,
  muted?: boolean,
  children?: any,
  in?: any,
  out?: any,
  ins? : any[],
  outs? : any[],
  blend?: string,
} & GroupProps

const Video = (props: VideoProps) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Video:'" + props.children + "' must be inside a Scene");
  }

  const imagePath = path.join(__dirname, './../../src/' + props.src);

  const { width, height } = makeSize(props);

  const position = makePosition({
    ...props,
    width,
    height,
  });


  const video = new FFVideo({
    path: imagePath,
    ...position,
    width,
    height,
    audio: props.muted === false,
    scale: props.scale,
  });

  makeAnimation(video, props);

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

  if(props.blend) {
    video.addBlend(props.blend);
  }
  currentScene.addChild(video);

  if (currentGroup) {
    currentGroup.addChild(video);
  }

  if (props.children) {
    const { children, x, y} = props;
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

export default Video;