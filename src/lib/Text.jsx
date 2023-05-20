import staticState from "./state";
import { makeAnimation, makePosition } from "./utils";
const { FFText, FFRect } = require("ffcreator");

const Text = (props) => {

  const { currentScene, currentGroup } = staticState;

  if (!currentScene) {
    throw new Error("Text:'" + props.children + "' must be inside a Scene");
  }

  const position = makePosition({
    ...props,
    width: props.width || 10,
    height: props.height || props.size || 20,
  });

  const text = new FFText({
    text: props.children,
    color: props.color || '#333333',
    ...position,
    fontSize: props.size || 20,
  });

  if(currentGroup?.font) {
    text.setFont(currentGroup.font);
  }
  if(props.font) {
    text.setFont(props.font);
  }


  if(props.wrap && props.wrap !== 'none') {
    text.setWrap(parseInt(props.wrap));
  }

 

  makeAnimation(text, props);
  text.alignCenter();

  if (currentScene.outline) {
    const outline = new FFRect({
      width: props.width || 10,
      height: props.height || props.size || 20,
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

  if (currentGroup) {    

    const bounds = currentGroup.getBounds();
      if(bounds.width && !props.wrap) {
        text.setWrap(bounds.width);
      }
    currentGroup.addChild(text);
  }

  if(props.width && props.wrap !== 'none') {
    text.setWrap(parseInt(props.width));
  }


  currentScene.addChild(text);

  return null;
}

export default Text;