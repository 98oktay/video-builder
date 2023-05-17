
import React from "react";
import Scene from "./lib/Scene";
import Creator from "./lib/Creator";
import Text from "./lib/Text";
import Transition from "./lib/Transition";
import Image from "./lib/Image";
import Group from "./lib/Group";

function Composition() {

  return (
    <Creator name="video1">
      <Scene color="#cecece" duration={5} >
        <Group x={"30%"} y={"30%"} width={300} height={300} in={['fadeInUp', 1, 0]}
          out={['fadeOut', 1, 2]}>
          <Text x="right" width={70}>Başkuş</Text>
          <Text x="left" in={['fadeInDown', 1, .1]} width={70}>Oktay 2</Text>

          <Group y={0} x={"100%"} width={100} height={100}>
            <Text y="top">1234</Text>
            <Text y="bottom">AAA</Text>
          </Group>
        </Group>

        <Text x="right" width={70}>Oktay 3</Text>
      </Scene>
      <Transition effect="TricolorCircle" duration={3} />
      <Scene color="orange" outline preview>
        <Text x={"center"} y="center"
          in={['bounceInUp', 1, .3]}
          out={['fadeOut', 1, 2]}
          width={100}>Başkuş</Text>
        <Image src="./assets/logo.png" x={"center"} y={"80%"} width={300}
          in={['fadeInUp', 1, 1]}
          aspectRatio={5000 / 694}
        />
      </Scene>



    </Creator>);
}

export default Composition;