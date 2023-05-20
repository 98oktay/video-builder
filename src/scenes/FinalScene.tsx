import React from "react";
import { Audio, Image, Scene } from "../lib";


export default (props: any) => {

  const bgAnim = { from: { scale: 0.8 }, to: { scale: 2 }, time: 9, ease: 'Back.Out', }

  return (
    <Scene color="#000000" duration={12} {...props} preview>
      <Audio src="./audio/bg1.mp3" />
      <Image src="./assets/bg/bg-home.png" animation={bgAnim}>

        <Image src="./assets/kv-logo-a.png" width={270} y={500} in={['bounceIn', 2, 0]} />
        <Image src="./assets/kv-logo-text.png" relative={[0, 20]} width={270} y={800} in={['bounceIn', 2, .5]} />
        <Image src="./assets/kv-playbutton.png" width={270} y={1500} in={['rollIn', .5, 1]} />
        <Image src="./assets/simdi-oyna-text.png" y={1500} scale={0.7} in={['bounceIn', 2, 1.2]} />

        <Image src="./assets/google-play.png" blend="ADD" relative={[0, -200]} y={1150} scale={1.7} in={['bounceIn', 3, 1.4]} />
        <Image src="./assets/appstore.png" blend="ADD" relative={[0, 230]} y={1150} scale={1.7} in={['bounceIn', 3, 1.6]} />
      </Image>
    </Scene>)
}