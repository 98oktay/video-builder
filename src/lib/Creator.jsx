import React from "react";
import { FFCreator } from "ffcreator";
import staticState from "./state";
import Renderer from "./Renderer";

const Creator = ({
  children,
  name = "",
  cacheDir = "./.tmp",
  outputDir = "./out",
  width = 1080,
  height = 1080,
  fps = 30,
  transparent = false,

}) => {


  staticState.options = {
    cacheDir,
    outputDir,
    parallel: 8,
    transparent,
    highWaterMark: '10mb',
    debug: false,
    width,
    height,
    fps,
  };

  staticState.creator = new FFCreator(staticState.options);

  staticState.fileName = name;

  return <>
    {children}
    <Renderer />
  </>;
};

export default Creator;