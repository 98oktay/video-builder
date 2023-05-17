import staticState from "./state";
import { makeAnimation, makePosition } from "./utils";
const { FFText, FFRect } = require("ffcreator");

const Text = (props) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Text:'" + props.children + "' must be inside a Scene");
  }

  const position = makePosition(props);

  const text = new FFText({
    text: props.children,
    color: '#333333',
    ...position,
    fontSize: 20,
  });

  makeAnimation(text, props);
  text.alignCenter();

  if (currentScene.outline) {
    const outline = new FFRect({
      width: props?.width || 1,
      height: 20,
      ...position,
      color: 'red',
      opacity: 0.5,
    });
    makeAnimation(outline, props);
    currentScene.addChild(outline);
    if (currentGroup) {
      currentGroup.addChild(outline);
    }
  }

  currentScene.addChild(text);


  if (currentGroup) {
    currentGroup.addChild(text);
  }

  return null;
}

export default Text;