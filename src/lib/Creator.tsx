import React from "react";
import { FFCreator } from "ffcreator";
import staticState from "./state";
import Renderer from "./Renderer";

export interface CreatorProps {
  name?: string;
  cacheDir?: string;
  outputDir?: string;
  width?: number;
  height?: number;
  fps?: number;
  transparent?: boolean;
  children?: any;
}

const Creator = ({
  children,
  name = "",
  cacheDir = "./.tmp",
  outputDir = "./out",
  width = 1080,
  height = 1080,
  fps = 30,
  transparent = false,

}: CreatorProps) => {


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