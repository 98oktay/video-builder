import React from "react";
import path from "path";
import { Creator, Group, Image, Scene, Text, Transition, Video } from "./lib";
import Box from "./lib/Box";
import Line from "./lib/Line";
import Lottie from "./lib/Lottie";

const fontAllison = path.join(__dirname, "../src", "fonts", "Allison-Regular.ttf")

const lottieFile = path.join(__dirname, "../src", "assets", "lottie", "143739-industrial-automatic-robot-arms.json")
const assets = path.join(__dirname, "../src", "assets")

function Composition() {

  return (
    <Creator name="video1" fps={30} width={800} height={900}>

      <Scene color="#efefef" duration={9}>
        <Image
          radius={[40, 140]}
          border={{ width: 32, color: 'white' }}
          url="https://images.pexels.com/videos/1409899/free-video-1409899.jpg?auto=compress&cs=tinysrgb&w=800" width={400} height={200} y={22} in={['fadeInLeft', 1, 0]}>
          <Text y={"90%"} color="white">Rounded and Bordered Image</Text>
        </Image>


        <Group x={"30%"} y={"40%"} width={300} height={300} in={['fadeInUp', 1, 0]}
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
            color="white">Video Content</Text>
        </Video>

        <Box width={400} height={400} border={{ width: 10, color: "#000000" }} color={["#ff000080", "#0000ff", "#ffff00"]} radius={50} x={100} y={600} in={['bounceInDown', 1, .2]} />
        <Line
          x={100} y={300}
          x2={700} y2={300}
          border={2} color={["#ff0000", "#ffff00"]}
          in={['bounceInDown', 1, .2]} />


        <Lottie file={lottieFile} width={400} height={400} x={"right"} y={"bottom"} in={['fadeInUp', 1, 0]} />
        <Lottie file={assets + "/lottie/143939-samurai-idle-animation.json"} width={200} height={200} x={0} y={0} in={['fadeInUp', 1, 0]} />


      </Scene>
      <Transition effect="TricolorCircle" duration={3} />
      <Scene color="#222222">
        <Video src="./assets/video2.mp4" width={"100%"} height={"100%"}>
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
        </Video>
      </Scene>
    </Creator>);
}

export default Composition;