
import React from "react";
import Scene from "./lib/Scene";
import Creator from "./lib/Creator";
import Text from "./lib/Text";
import Transition from "./lib/Transition";
import Image from "./lib/Image";
import Group from "./lib/Group";
import path from "path";
import Video from "./lib/Video";

const fontAllison = path.join(__dirname, "../src", "fonts", "Allison-Regular.ttf")

function Composition() {

  return (
    <Creator name="video1" fps={30}>
      <Scene color="#cecece" duration={5}>
        <Image src="./assets/header.jpg" width={"100%"} height={220} y={0} in={['fadeInLeft', 1, 0]}>
          <Text width={70}>Oktay 3</Text>
        </Image>

        <Group x={"30%"} y={"30%"} width={300} height={300} in={['fadeInUp', 1, 0]}
          out={['fadeOut', 1, 2]}>
          <Text x="right" width={80}>Başkuş</Text>
          <Text x="left" in={['fadeInDown', 1, .1]} width={80}>Oktay 2</Text>

          <Group y={0} x={"100%"} width={100} height={100} in={['fadeInDown', 1, .2]}>
            <Text y="top">1234</Text>
            <Text y="bottom">AAA</Text>
          </Group>
        </Group>

        <Video src="./assets/video.mp4" width={"80%"} height={200}>

          <Text
            font={fontAllison}
            size={160}
            height={200}
            color="white"
          >Video Content</Text>


        </Video>


      </Scene>
      <Transition effect="TricolorCircle" duration={3} />
      <Scene color="#222222">

        <Group width={200} height={300} list="vertical">
          <Text>Item1</Text>
          <Text>Item2</Text>
          <Text>Item3</Text>
          <Text>Item4</Text>
        </Group>


        <Text x={"center"} y="90%"
          font={fontAllison}
          size={30}
          color="white"
          in={['bounceInUp', 1, .3]}
          out={['fadeOut', 1, 2]}
          width={100}>Copyright 2023</Text>
        <Image src="./assets/logo.png" x={"center"} y={"80%"} width={300}
          in={['fadeInUp', 1, 1]}
          aspectRatio={5000 / 694}
        />
      </Scene>



    </Creator>);
}

export default Composition;