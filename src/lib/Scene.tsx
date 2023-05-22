import React from "react";
import staticState from "./state";
import { FFScene } from "ffcreator";


const SceneClose = () => {
  const { currentScene } = staticState;
  if (currentScene) {
    staticState.currentScene = null
  }

  return null;
}

type SceneProps = {
  color?: string,
  duration?: number,
  children?: any,
  preview?: boolean,
  slow?: boolean,
  outline?: boolean,
}

const Scene = ({ color, duration = 6, children, preview, slow, outline }: SceneProps) => {
  const { creator, scenes } = staticState;

  if (!creator) {
    throw new Error("Scene must be a child of Creator");
  }

  const scene = new FFScene();

  if (color) {
    scene.setBgColor(color || "#ffcc22");
  }

  scene.setDuration(duration);
  creator.addChild(scene);


  if (preview) {
    staticState.preview = scene;
  }

  if (slow) {
    staticState.preview = scene;
    staticState.slow = true;
  }

  staticState.currentScene = scene;

  if (outline) {
    staticState.currentScene.outline = true;
  }


  scenes.push(scene);
  return <>
    {children}
    <SceneClose />
  </>;
}
export default Scene;