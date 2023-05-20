import staticState from "./state";
const { FFAudio, FFRect } = require("ffcreator");
import path from 'path';

const Audio = (props) => {

  const { currentScene, creator } = staticState;

  if (!creator) {
    throw new Error("Audio:'" + props.children + "' must be inside a Scene or Creator");
  }

  const audioPath = path.join(__dirname, './../../src/' + props.src);

  const audio = new FFAudio({
    path: audioPath,
    loop: props.loop || false,
    mute: props.mute || false,
    startTime: props.startTime || 0,
    fadeIn: props.fadeIn || 0,
    fadeOut: props.fadeOut || 0,
    volume: props.volume || 1,
  });



  creator.addAudio(audio);

  return null;
}

export default Audio;