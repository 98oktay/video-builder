import React from "react";
import staticState from "./state";
const { FFScene } = require("ffcreator");


const SceneClose = () => {
  const { currentScene } = staticState;
  if (currentScene) {
    staticState.currentScene = null
  }

  return null;
}


const Scene = ({ color, duration = 6, children, preview, outline }) => {
  const { creator, scenes } = staticState;

  if (!creator) {
    throw new Error("Scene must be a child of Creator");
  }

  const scene = new FFScene();

  scene.setBgColor(color || "#ffcc22");
  scene.setDuration(duration);
  creator.addChild(scene);
  

  if(preview) {
    staticState.preview = scene;
  }

  if(outline) {
    scene.outline = true;
  }

  staticState.currentScene = scene;


  scenes.push(scene);
  return <>
    {children}
    <SceneClose />
  </>;
}
export default Scene;