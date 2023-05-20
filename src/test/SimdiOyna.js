const {FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator} = require("ffcreator");

const width = 1080;
const height = 1920;

const scene = new FFScene();
scene.setBgColor("#000000");
scene.setDuration(6);

const bg1 = new FFImage({path: "./assets/bg-home.png", x: width / 2, y: height / 2});
//const bg1 = new FFImage({path: "./assets/bg/canvas-bg-9.jpg", x: width / 2, y: height / 2, scale: 2.7});
bg1.addAnimate({
    from: { scale: 0.8 },
    to: { scale: 2 },
    time: 9,
    ease: 'Back.Out',
});









































bg1.addAnimate({
    from: {  blur:30 },
    to: { blur:0 },
    time: 1
});
scene.addChild(bg1);


const logo = new FFImage({path: "./assets/kv-logo-a.png", x: width / 2, y: 500, width: 270, height: 267})
logo.addEffect('bounceIn', 2, 0);


const logoText = new FFImage({path: "./assets/kv-logo-text.png", x: width / 2 + 20, y: 800, width: 270})
logoText.addEffect('bounceIn', 2, .5);

const simdiOynaButton = new FFImage({path: "./assets/kv-playbutton.png", x: width / 2, y:1500, width: 270})
simdiOynaButton.addEffect('rollIn', .5, 1);


const simdiOynaText = new FFImage({path: "./assets/simdi-oyna-text.png", x: width / 2, y:1500, scale: .7})
simdiOynaText.addEffect('bounceIn', 2, 1.2);


const googlePlay = new FFImage({path: "./assets/google-play.png", x: width / 2 - 200, y:1150, scale: 1.7})
googlePlay.addBlend("ADD")

const appStore = new FFImage({path: "./assets/appstore.png", x: width / 2 + 230, y:1150, scale: 1.7})
appStore.addBlend("ADD")


googlePlay.addEffect('bounceIn', 3, 1.4);
appStore.addEffect('bounceIn', 3, 1.6);

scene.addChild(logo);
scene.addChild(logoText);
scene.addChild(simdiOynaText);
scene.addChild(simdiOynaButton);
scene.addChild(googlePlay);
scene.addChild(appStore);


module.exports = scene;
