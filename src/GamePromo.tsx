import React from "react";
import { Creator, Image, Scene, Transition } from "./lib";
import FinalScene from "./scenes/FinalScene";
import Muhtarlar from "./scenes/Muhtarlar";

function Composition() {

  return (
    <Creator name="video1" width={1080} height={1920}>
      <Muhtarlar />
      <Transition effect="TricolorCircle" duration={3} />
      <FinalScene />

    </Creator>);
}

export default Composition;