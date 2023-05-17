import React from "react";
import { FFCreator } from "ffcreator";
import staticState from "../staticState";
import Renderer from "../Components/Renderer";

const Creator = ({
  children,
  name = "",
  cacheDir = "./.tmp",
  outputDir = "./out",
  width = 1080,
  height = 1080,
  fps = 30,

}) => {


  staticState.options = {
    cacheDir,
    outputDir,
    parallel: 8,
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