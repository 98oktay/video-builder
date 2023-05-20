import React from "react";
import { Creator, Image, Scene } from "./lib";
import FinalScene from "./scenes/FinalScene";

function Composition() {

  return (
    <Creator name="video1" width={1080} height={1920}>
      <FinalScene />

    </Creator>);
}

export default Composition;